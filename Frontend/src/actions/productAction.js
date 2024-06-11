import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,

  ADMIN_PRODUCT_REQUEST, 
  ADMIN_PRODUCT_SUCCESS, 
  ADMIN_PRODUCT_FAIL,

  NEW_PRODUCT_REQUEST, 
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,

  UPDATE_PRODUCT_REQUEST, 
  UPDATE_PRODUCT_SUCCESS, 
  UPDATE_PRODUCT_FAIL, 

  DELETE_PRODUCT_REQUEST, 
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 250000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
      }
      const data = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// spesific product details
export const getProductDetails =
 (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const data = await axios.get(`/api/v1/products/details/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// new Review
export const newReview = 
(reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log('dispatching');
    const data = await axios.put(`/api/v1/review`, reviewData, config);
    console.log(data);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
    
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear error
export const clearErrors = 
() => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getAdminProducts = 
() => async (dispatch) => {
  try {
    dispatch({type: ADMIN_PRODUCT_REQUEST})

    const {data} = await axios.get(`/api/v1/admin/products`);
    console.log('Admin Products: ');
    dispatch({type: ADMIN_PRODUCT_SUCCESS, payload: data.products})
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const createProduct = 
(productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    console.log('Dispatching');
    const { data } = await axios.post(
      `/api/v1/admin/products/create`,
      productData,
      config
    );

    console.log(data);

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({type : DELETE_PRODUCT_REQUEST });

      console.log('Delete Dispatch');
      const data = await axios.delete(`/api/v1/admin/products/delete/${id}`);

      dispatch({
        type: DELETE_PRODUCT_SUCCESS, 
        payload: data.success
      });

    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/update/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}