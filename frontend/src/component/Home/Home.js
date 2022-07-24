import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Blue TShirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "Rs 3000",
  _id: "arsalan_azmi",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome To Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;