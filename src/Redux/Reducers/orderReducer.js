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

const calculateTotalSubtotal = (orders) => {
    return orders.reduce((total, order) => {
        return total + order.orderItems.reduce((subtotal, item) => subtotal + (item.productSubtotal || item.productPrice * item.productQuantity), 0);
    }, 0);
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
                error: '',
                totalSubtotal: calculateTotalSubtotal(action.payload) 
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
                error: '',
                totalSubtotal: calculateTotalSubtotal(state.orders) 
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
