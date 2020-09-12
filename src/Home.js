import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import data from "./products.json";
import FlipMove from "react-flip-move";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { CircularProgress } from "@material-ui/core";

// https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg
// https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg

function Home() {
  const [{ products }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    db.collection("products").onSnapshot((snapshot) => {
      var items = snapshot.docs.map((doc) => {
        var { title, image, price, rating } = doc.data();
        return {
          title,
          image,
          price,
          rating,
          id: doc.id,
        };
      });
      dispatch({
        type: "SET_PRODUCTS",
        products: items,
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg"
      />

      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <p style={{ marginTop: "50px" }}>Fetching products from database</p>
        </div>
      ) : (
        <>
          <FlipMove
            appearAnimation="accordionVertical"
            enterAnimation="fade"
            leaveAnimation="fade"
            leaveAnimation="elevator"
            delay={200}
            staggerDelayBy={150}
          >
            <div className="home__row">
              {products.map(({ id, title, price, rating, image }) => {
                if (id !== "2sUCuKMDsy4WhkYc0uSD") {
                  return (
                    <Product
                      key={id}
                      id={id}
                      title={title}
                      price={price}
                      rating={rating}
                      image={image}
                    />
                  );
                }
              })}
            </div>
          </FlipMove>

          <div className="home__rowlarge">
            <Product
              id="2sUCuKMDsy4WhkYc0uSD"
              title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
              price={100000}
              rating={5}
              image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SX679_.jpg"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
