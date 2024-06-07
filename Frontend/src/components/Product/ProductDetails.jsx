import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import {useAlert} from "react-alert"
import MetaData from "../Layout/MetaData"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  let [quantity, setQuantity] = useState(1);

  const increaseQuantity = () =>{
    if(quantity < product.stock){
      quantity = quantity + 1;
      setQuantity(quantity);
    }
  }

  const decreaseQuantity = () =>{
    if(quantity > 1){
      quantity = quantity -1;
      setQuantity(quantity);
    }
  }

  let { id } = useParams();
  const alert = useAlert();
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    activeColor: "tomato",
    isHalf: true,
    value: product.rating,
    readOnly: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const addToCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- E-Commerce`}/>
          <div className="ProductDetails">
            <div className="carousel-container">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="details-container">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product {`#${product._id}`}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="quantity-controls">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" min={1} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Yet !!! </p>
          )}
        </Fragment>
      ) }
    </Fragment>
  );
};

export default ProductDetails;
