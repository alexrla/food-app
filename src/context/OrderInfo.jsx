import { createContext, useReducer } from "react";
import { ORDER_SET_TYPE } from "../constants/constants";

const Store = createContext();

const initialState = {
  order: {
    orderType: "Eat here"
  }
};

function reducer(state, action) {
  switch(action.type) {
    case ORDER_SET_TYPE: 
      return {
        ...state, order: { ...state.order, orderType: action.payload }
      }
    default: 
      return state;
  }
}

function StoreProvider(props) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export {
  Store,
  StoreProvider
};
