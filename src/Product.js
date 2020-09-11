import React from "react";
import "./Product.css";
import { Button } from "@material-ui/core";
import { StateContext } from "./StateProvider";
import { withHooksHOC } from "./withHookHoc";

class Product extends React.Component {
  static contextType = StateContext;

  render() {
    const [{}, dispatch] = this.context;
    const {
      id,
      title,
      price,
      rating,
      image,
      addToast,
      extraClass,
    } = this.props;

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
      addToast.addToast(`Item added to basket : ${title}`, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    };

    return (
      <div className={extraClass ? "product product__hoverremove" : "product"}>
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>RS </small>
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

export default withHooksHOC(Product);
