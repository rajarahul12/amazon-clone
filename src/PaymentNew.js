import React, { useState, useEffect } from "react";
import "./PaymentNew.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { getTotalItems, getBasketTotal } from "./reducer";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";
import { Button, CircularProgress } from "@material-ui/core";

import PaymentCard from "react-payment-card-component";

function PaymentNew() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [number, setNumber] = useState("xxxx-xxxx-xxxx-xxxx");

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    if (getTotalItems(basket) === 0) {
      history.push("/");
    }
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total currencies subunits
        url: `/payments/create?total=${Math.trunc(
          getBasketTotal(basket) * 100
        )}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is  >>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNumber("xxxx-xxxx-xxxx-4242");
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    console.log(("Onchange  ", e));
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="paymentNew">
      <div className="paymentNew__left">
        <h2>Make Order</h2>
        <div className="paymentNew__leftOne">
          <div className="paymentNew__leftMap">
            <img src={require("./map.png")} />
          </div>
          <div className="paymentNew__leftDetails">
            <div>
              <p>Shipping Date</p>
              <h5>Tomorrow, 12AM-6PM</h5>
            </div>
            <div>
              <p>Shipping Details</p>
              <h5>Gerogia</h5>
              <h5>Los Angeles, CA</h5>
            </div>
            <div>
              <p>Delivery To</p>
              <h5>{user?.email}</h5>
            </div>
          </div>
        </div>
        <div className="card__details">
          <PaymentCard
            bank="itau"
            model="personnalite"
            type="black"
            brand="visa"
            number={number}
            cvv="202"
            holderName={user?.email.split("@")[0]}
            expiration="12/20"
            flipped={false}
          />
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              {/* <h3>Products Count : {getTotalItems(basket)}</h3> */}
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"RS "}
                />

                <Button
                  className="button__submit"
                  onClick={handleSubmit}
                  disabled={processing || disabled || succeeded}
                >
                  <span>
                    {processing ? (
                      <div className="payment__process">
                        <p>Processing</p>
                        <CircularProgress />
                      </div>
                    ) : (
                      <p>Buy Now</p>
                    )}
                  </span>
                </Button>
              </div>
              {error ? (
                <div className="payment__error">{error}</div>
              ) : (
                <div className="payment__error"></div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="paymentNew__right">
        <h2>Review Items</h2>
        <div>
          {basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentNew;
