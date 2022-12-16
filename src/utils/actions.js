import axios from "axios";

import { 
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  SCREEN_SET_WIDTH,
  ORDER_QUEUE_LIST_REQUEST,
  ORDER_QUEUE_LIST_SUCCESS,
  ORDER_QUEUE_LIST_FAIL
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
};

const listProducts = async(dispatch, categoryName = "") => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  try {
    const { data } = await axios.get(`http://localhost:5000/products?category=${categoryName}`);

    return dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    return dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message
    });
  }
};

const addToOrder = async(dispatch, item) => {
  return dispatch({
    type: ORDER_ADD_ITEM,
    payload: item
  });
};

const removeFromOrder = async(dispatch, item) => {
  return dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: item
  });
};

const clearOrder = async(dispatch, item) => {
  return dispatch({
    type: ORDER_CLEAR
  });
};

const setPaymentType = async(dispatch, paymentType) => {
  return dispatch({
    type: ORDER_SET_PAYMENT_TYPE,
    payload: paymentType
  });
};

const createOrder = async(dispatch, order) => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  try {
    const { data } = await axios.post("http://localhost:5000/create-order", order);

    console.log(data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
    return dispatch({ type: ORDER_CLEAR });
  } catch (error) {
    return dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.message
    });
  }
};

const listOrders = async(dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: ORDER_LIST_REQUEST });

  try {
    const { data } = await axios.get("http://localhost:5000/orders");

    return dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    return dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.message
    });
  }
};

const listQueue = async(dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: ORDER_QUEUE_LIST_REQUEST });

  try {
    const { data } = await axios.get("http://localhost:5000/orders/queue");

    return dispatch({
      type: ORDER_QUEUE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    return dispatch({
      type: ORDER_QUEUE_LIST_FAIL,
      payload: error.message
    });
  }
}
export { 
  setOrderType,
  listCategories,
  listProducts,
  addToOrder,
  removeFromOrder,
  clearOrder,
  setPaymentType,
  createOrder,
  listOrders,
  listQueue
};