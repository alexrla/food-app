import { createContext, useReducer } from "react";
import { 
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from "../constants/constants";

const Store = createContext();

const initialState = {
  categoryList: { loading: true },
  productList: { loading: true },
  order: {
    orderType: "Eat here"
  }
};

function reducer(state, action) {
  switch(action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, categoryList: { loading: true } };

    case CATEGORY_LIST_SUCCESS:
      return { 
        ...state, 
        categoryList: { loading: false, categories: action.payload } 
      };
    
    case CATEGORY_LIST_FAIL:
      return { 
        ...state, 
        categoryList: { loading: false, error: action.payload } 
      };

    case PRODUCT_LIST_REQUEST:
      return { ...state, productList: { loading: true } };

    case PRODUCT_LIST_SUCCESS:
      return { 
        ...state, 
        productList: { loading: false, products: action.payload } 
      };
    
    case PRODUCT_LIST_FAIL:
      return { 
        ...state, 
        productList: { loading: false, error: action.payload } 
      };

    case ORDER_SET_TYPE: 
      return {
        ...state, order: { ...state.order, orderType: action.payload }
      };

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
