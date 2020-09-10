import React from "react";
import "./Home.css";
import Product from "./Product";
import data from "./products.json";
import FlipMove from "react-flip-move";

// https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg
function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
      />

      <FlipMove
        appearAnimation="accordionVertical"
        enterAnimation="fade"
        leaveAnimation="fade"
        leaveAnimation="elevator"
      >
        <div className="home__row">
          {data.map(({ id, title, price, rating, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              rating={rating}
              image={image}
            />
          ))}
        </div>
      </FlipMove>

      <div className="home__rowlarge">
        <Product
          id="6"
          title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
          price={1699.3}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SX679_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
