import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false, 
    activeColor: 'tomato', 
    isHalf: true, 
    value:2.5,
    readOnly: true,
    size: window.size < 600 ? 20 : 25, 
  };

  return (
    <Link className="productCard" to={`${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStarts {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;