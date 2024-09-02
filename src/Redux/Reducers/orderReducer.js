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

const initialState = {
    loading: false,
    orders: [],
    order: null,
    error: ''
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
        case FETCH_ORDER_BY_ID_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: ''
            };
        case FETCH_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: ''
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
                error: ''
            };
        case FETCH_ORDERS_FAILURE:
        case FETCH_ORDER_BY_ID_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};