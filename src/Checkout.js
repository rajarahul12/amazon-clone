import React from "react";
import { useStateValue } from "./StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import FlipMove from "react-flip-move";

function CheckOut() {
  const [{ basket }] = useStateValue();

  const ticketNotVisibleState = {
    transform: "translateX(100%)",
    opacity: 0.1,
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="AD"
        />
        {basket?.length === 0 ? (
          <div>
            <h2>Your shopping basket is empty</h2>
            <p>
              You have no items in your cat. To buy one, click on "Add to Cart"
              next to the item
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title"> Your shopping basket</h2>
            <FlipMove
              appearAnimation="accordionVertical"
              leaveAnimation="elevator"
              // staggerDelayBy={150}
              // enterAnimation={{
              //   from: {
              //     transform: "rotateX(180deg)",
              //     opacity: 0.1,
              //   },
              //   to: {
              //     transform: "",
              //   },
              // }}
              // leaveAnimation={{
              //   from: {
              //     transform: "",
              //   },
              //   to: {
              //     transform: "rotateX(-120deg)",
              //     opacity: 0.1,
              //   },
              // }}
            >
              {basket?.map((item) => (
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
            </FlipMove>
          </div>
        )}
      </div>
      {basket.length > 0 && (
        <div className="checkout__right">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default CheckOut;
