import axios from 'axios';
import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDER_BY_ID_REQUEST,
    FETCH_ORDER_BY_ID_SUCCESS,
    FETCH_ORDER_BY_ID_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
} from '../actionTypes';


export const fetchOrders = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDERS_REQUEST });
        try {
            const response = await axios.get('https://art-ecommerce-server.glitch.me/admin/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            dispatch({
                type: FETCH_ORDERS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_ORDERS_FAILURE,
                payload: error.message
            });
        }
    };
};


export const fetchOrderById = (orderId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_BY_ID_REQUEST });
        try {
            const response = await axios.get(`https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            dispatch({
                type: FETCH_ORDER_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: FETCH_ORDER_BY_ID_FAILURE,
                payload: error.message
            });
        }
    };
};


export const updateOrderStatus = (orderId, newStatus) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        try {
            const response = await axios.put(
                `https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`,
                newStatus,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            );
            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_ORDER_STATUS_FAILURE,
                payload: error.message
            });
        }
    };
};
