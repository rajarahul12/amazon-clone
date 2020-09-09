import React from "react";
import "./Home.css";
import Product from "./Product";

// https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg
function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
      />
      <div className="home__row">
        <Product
          id="1"
          title="Sony WH-1000XM3 Industry Leading Wireless Noise Cancelling Headphones, Bluetooth Headset with Mic for Phone Calls, 30 Hours Battery Life, Quick Charge, Touch Control & Alexa Voice Control – (Black)"
          price={200.96}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/6125kwHG4gL._SX679_.jpg"
        />
        <Product
          id="2"
          title="Logitech MX Master 2S Wireless Mouse, Multi-Device, Bluetooth or 2.4GHz Wireless with USB Unifying Receiver, 4000 DPI Any Surface Tracking, 7 Buttons, Fast Rechargeable, Laptop/PC/Mac/iPad OS - Black"
          price={30}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/61nlvOcfINL._SX679_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id="3"
          title="Samsung Galaxy Watch Active 2 (Bluetooth, 44 mm) - Black, Aluminium Dial, Silicon Straps"
          price={250}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/61uej9efKYL._SX679_.jpg"
        />
        <Product
          id="4"
          title="Apple AirPods Pro"
          price={230.45}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._SX679_.jpg"
        />
        <Product
          id="5"
          title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey"
          price={2399.99}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/71L2iBSyyOL._SX679_.jpg"
        />
      </div>
      <div className="home__row">
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
