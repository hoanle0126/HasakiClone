import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_ORDER_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SHOW_ADDRESS_REQUEST,
  SHOW_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from "./actionType";

const initialState = {
  user: {},
  cities: [],
  addressValue: {
    districts: [],
    wards: [],
  },
  loading: false,
  authLoading: false,
  authError: null,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        authLoading: true,
      };
    case GET_USER_REQUEST:
    case ADD_CART_REQUEST:
    case ADD_ADDRESS_REQUEST:
    case SHOW_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
    case ADD_ORDER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
    case ADD_CART_SUCCESS:
    case ADD_ADDRESS_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
    case DELETE_ADDRESS_SUCCESS:
    case ADD_ORDER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case SHOW_ADDRESS_SUCCESS:
      return { ...state, addressValue: action.payload, loading: false };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, user: action.payload, authLoading: false };
    case LOGOUT_SUCCESS:
      return { ...state, user: {}, loading: false };
    case VERIFY_EMAIL_REQUEST:
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
      return { ...state, authLoading: false, authError: action.error };
    case GET_USER_FAILURE:
      return { ...state, user: {}, loading: false };
    default:
      return state;
  }
};
