import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { StateContext } from "./StateProvider";

export default class Product extends React.Component {
  static contextType = StateContext;

  render() {
    const [{}, dispatch] = this.context;

    const { id, title, price, rating, image } = this.props;

    // const { addToast } = useToasts();

    const addToBasket = () => {
      //Add item to basket
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
      // addToast("Item added to basket", {
      //   appearance: "success",
      //   autoDismiss: true,
      //   autoDismissTimeout: 1800,
      // });
    };

    return (
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_) => (
                <p>⭐️</p>
              ))}
          </div>
        </div>
        <img src={image} />
        <Button onClick={addToBasket} variant="contained">
          Add to cart
        </Button>
      </div>
    );
  }
}
