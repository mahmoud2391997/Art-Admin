import { ADD_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT } from "../actionTypes";  

const initialState = {  
    products: [],  
    status: 'idle',  
    error: null,  
    selectedProduct: null,  
};  

export const productsReducer = (state = initialState, action) => {  
    switch (action.type) {  
        case 'LOADING': {  
            return {  
                ...state,  
                status: 'loading'  
            };  
        }  
        case 'ERROR': {  
            return {  
                ...state,  
                status: 'error',  
                error: action.payload  
            };  
        }  
        case ADD_PRODUCT: {  
            return {  
                ...state,  
                products: [...state.products, action.payload],  
                status: 'success'  
            };  
        }  
        case FETCH_PRODUCTS: {  
            return {  
                ...state,  
                products: action.payload,  
                status: 'success'  
            };  
        }  
        case FETCH_PRODUCT_BY_ID: {  
            return {  
                ...state,  
                selectedProduct: action.payload,  
                status: 'success'  
            };  
        }  
        case DELETE_PRODUCT: {  
            return {  
                ...state,  
                products: state.products.filter((product) => product._id !== action.payload)  
            };  
        }  
        case EDIT_PRODUCT: {  
            return {  
                ...state,  
                products: state.products.map((product) =>  
                    product._id === action.payload._id ? action.payload : product  
                ),  
                status: 'success'  
            };  
        }  
        default:   
            return state;  
    }  
};