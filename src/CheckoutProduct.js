import React from "react";
import "./CheckoutProduct.css";
import { Button } from "@material-ui/core";
import { StateContext } from "./StateProvider";

export default class CheckoutProduct extends React.Component {
  static contextType = StateContext;

  render() {
    const [{}, dispatch] = this.context;

    const {
      id,
      title,
      image,
      price,
      rating,
      quantity,
      hideButton = false,
    } = this.props;

    const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    const handleClick = () => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id,
          title,
          price,
          image,
          rating,
        },
      });
    };

    const handleReduce = () => {
      dispatch({
        type: "REDUCE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <div className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} alt="Product" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>RS </small>
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
            Quantity {"  "}
            {!hideButton && (
              <button
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={handleReduce}
              >
                -
              </button>
            )}
            <span style={{ padding: "10px", cursor: "pointer" }}>
              {quantity}
            </span>
            {!hideButton && <button onClick={handleClick}>+</button>}
          </p>
          {!hideButton && (
            <Button onClick={removeFromBasket} variant="contained">
              Remove from cart
            </Button>
          )}
        </div>
      </div>
    );
  }
}
