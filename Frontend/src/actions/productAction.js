import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct = (keyword = "", currentPage=1) => async (dispatch) =>{
    try {
        
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`
        const data = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS, 
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

// spesific product details
export const getProductDetails = (id) => async (dispatch) =>{
    try {
        
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        console.log(id);
        const data = await axios.get(`/api/v1/products/details/${id}`);
        console.log('check 2');

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

// clear error
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS,
    })
}