import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

function Products() {
  const dispath = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, error, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    dispath(getProduct(keyword, currentPage));
  }, [dispath, keyword, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">{ keyword ? `${keyword}` : 'Products'}</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {
            resultPerPage < productsCount && (
                <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
            </div>
            )
          }  

        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
