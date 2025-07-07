import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
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
  cities: [],
  loading: false,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case LOGOUT_REQUEST:
    case ADD_CART_REQUEST:
    case GET_CITIES_REQUEST:
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_USER_SUCCESS:
    case ADD_CART_SUCCESS:
    case ADD_ADDRESS_FAILURE:
      return { ...state, user: action.payload, loading: false };
    case GET_CITIES_SUCCESS:
      return { ...state, cities: action.payload, loading: false };
    case LOGOUT_SUCCESS:
      return { ...state, user: {}, loading: false };
    default:
      return state;
  }
};
