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
} from '../actionTypes.js';

// دالة لجلب جميع الطلبات عبر Redux
export const fetchOrders = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDERS_REQUEST });
        try {
            const response = await axios.get('https://art-ecommerce-server.glitch.me/admin/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
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

// دالة لجلب طلب معين عبر معرّف الطلب
export const fetchOrderById = (orderId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_BY_ID_REQUEST });
        try {
            const response = await axios.get(`https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
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

// دالة لتحديث حالة الطلب
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
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
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
