import React from "react";
import data from "./products.json";
import Product from "./Product";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

function SearchProducts(props) {
  const location = useLocation();
  const history = useHistory();
  var products = [];

  if (location.data) {
    var searchTerm = location.data.searchTerm;

    products = data.filter(({ title }) => {
      return (
        title.includes(searchTerm) ||
        title.includes(searchTerm?.toLowerCase()) ||
        title.toLowerCase().includes(searchTerm)
      );
    });
  } else {
    history.push("/");
  }

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: "20px", textAlign: "center" }}>
        Found {products.length} results
      </h3>
      {products.length === 0 ? (
        <Button
          style={{
            backgroundColor: "#f0c14b",
            border: "1px solid",
            borderColor: "#a88734 #9c7e31 #846a29",
          }}
          onClick={() => history.push("/")}
        >
          Start Shopping
        </Button>
      ) : null}
      <div
        style={{
          marginTop: "0px",
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {products.map(({ id, title, price, rating, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            rating={rating}
            image={image}
            extraClass={"removeHover"}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchProducts;
