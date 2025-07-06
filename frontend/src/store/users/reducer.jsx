import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionType";

const initialState = {
  user: {},
  loading: false,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case LOGOUT_REQUEST:
    case ADD_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_USER_SUCCESS:
    case ADD_CART_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT_SUCCESS:
      return { ...state, user: {}, loading: false };
    default:
      return state;
  }
};
