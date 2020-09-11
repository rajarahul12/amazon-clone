import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <div className="order__topdiv">
        <div>
          <h4>Order placed</h4>
          <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        </div>
        <div>
          <p className="order__id">
            ORDER ID : <small>{order.id}</small>
          </p>
        </div>
      </div>
      <div>
        {order.data.basket?.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            quantity={item.quantity}
            hideButton={true}
          />
        ))}
        <CurrencyFormat
          renderText={(value) => (
            <h3 className="order__total">Order Total: {value}</h3>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"RS "}
        />
      </div>
    </div>
  );
}

export default Order;
