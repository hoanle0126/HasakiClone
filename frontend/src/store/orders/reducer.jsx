import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "./actionType";

const initialState = {
  order: {},
  orders: [],
  loading: false,
  error: null,
  meta: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [],
        meta: action.payload?.meta ?? { total: action.payload?.data?.length ?? 0 },
        loading: false,
      };
    case UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    default:
      return { ...state };
  }
};

