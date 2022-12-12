import axios from "axios";

import { 
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from "../constants/constants"

const setOrderType = (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType
  });
};

const listCategories = async(dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });

  try {
    const { data } = await axios.get("http://localhost:5000/categories");

    return dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    return dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.message
    });
  }
}

const listProducts = async(dispatch, categoryName = "") => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  try {
    const { data } = await axios.get(`http://localhost:5000/products?category=${categoryName}`);

    return dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    return dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message
    });
  }
}

export { 
  setOrderType,
  listCategories,
  listProducts
};