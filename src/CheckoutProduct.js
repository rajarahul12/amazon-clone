import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";

function CheckoutProduct({ id, title, image, price, rating, quantity }) {
  const [{}, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="Product" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>⭐️</p>
            ))}
        </div>
        <p className="checkoutProduct__price checkoutProduct__quantity">
          Quantity: {"  "}
          <strong>{quantity}</strong>
        </p>

        <Button onClick={removeFromBasket} variant="contained">
          Remove from cart
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
