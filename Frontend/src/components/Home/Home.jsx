import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../Layout/MetaData.jsx";

const product = {
  name: "White Shirt",
  images: [
    {
      url: "https://myraymond.com/cdn/shop/files/PCSA02850-W1-1.jpg?v=1716038872",
    },
  ],
  price: 1550,
  _id: "punitkishirt",
  numOfReviews: 250,
};
const Home = () => {
  return (
    <Fragment>
      <MetaData title='E-Commerce' />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
        <ProductCard product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
