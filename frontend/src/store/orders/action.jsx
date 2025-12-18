import { axiosClient } from "@/axios/axiosClient";
import {
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  UPDATE_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "./actionType";

export const getAllOrders =
  ({ paginate = 10, page = 1, search = "" }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    try {
      const { data } = await axiosClient.get(
        `/orders?paginate=${paginate}&page=${page}&search=${search}`
      );
      dispatch({
        type: GET_ALL_ORDERS_SUCCESS,
        payload: {
          data: data?.data ?? data ?? [],
          meta: data?.meta ?? null,
        },
      });
    } catch (error) {
      dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error });
    }
  };

export const getOrderById =
  ({ id, action }) =>
  async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    await axiosClient
      .get("/orders/" + id)
      .then((data) => {
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data.data });
        if (action) action(data.data);
      })
      .catch((error) => {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error });
      });
  };

export const updateOrder =
  ({ order, id, onSuccess = () => {}, refreshParams }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    await axiosClient
      .put("/orders/" + id, order)
      .then(async (data) => {
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.data });
        if (refreshParams) {
          await dispatch(getAllOrders(refreshParams));
        }
        onSuccess();
      })
      .catch((error) => {
        dispatch({ type: UPDATE_ORDER_FAILURE, error: error });
      });
  };

