import { ORDER_SET_TYPE } from "../constants/constants"

const setOrderType = (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType
  })
};

export { setOrderType };