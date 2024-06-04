import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader/Loader";
import {useAlert} from "react-alert"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
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
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
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
