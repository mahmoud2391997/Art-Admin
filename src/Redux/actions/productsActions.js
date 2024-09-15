import { ADD_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT } from "../actionTypes";
import { addProduct, fetchProducts, fetchProductById, deleteProduct, editProduct } from "../api/productsApi";

export const addProductAction = (product) => async (dispatch) => {
    dispatch({ type: 'LOADING' });
    try {
        const newProduct = await addProduct(product);
        dispatch({
            type: ADD_PRODUCT,
            payload: newProduct
        });
    } catch (error) {
        ('Error Adding Product', error);
        dispatch({ type: 'ERROR', payload: error.message });
    }
};

export const fetchProductsAction = () => async (dispatch) => {
    dispatch({ type: 'LOADING' });
    try {
        const products = await fetchProducts();
        dispatch({
            type: FETCH_PRODUCTS,
            payload: products
        });
    } catch (error) {
        ('Error Fetching Products', error);
        dispatch({ type: 'ERROR', payload: error.message });
    }
};

export const fetchProductByIdAction = (productId) => async (dispatch, getState) => {
    dispatch({ type: 'LOADING' });

    // If not found in local storage, check Redux state
    const { products } = getState().products;
    const existingProduct = products.find((product) => product._id === productId);

    if (existingProduct) {
        // If found in Redux state, dispatch it to Redux
        dispatch({
            type: FETCH_PRODUCT_BY_ID,
            payload: existingProduct,
        });
        //  update local storage as well
        localStorage.setItem(`product_${productId}`, JSON.stringify(existingProduct));
        return; 
    }

    // If not found in either, fetch from the API
    try {
        const product = await fetchProductById(productId);
        // Store the fetched product in local storage
        localStorage.setItem(`product_${productId}`, JSON.stringify(product));
        dispatch({
            type: FETCH_PRODUCT_BY_ID,
            payload: product,
        });
    } catch (error) {
        ('Error Fetching Product', error);
        dispatch({ type: 'ERROR', payload: error.message });
    }
};

export const deleteProductAction = (productId) => async (dispatch) => {
    dispatch({ type: 'LOADING' });
    try {
        await deleteProduct(productId);
        dispatch({
            type: DELETE_PRODUCT,
            payload: productId
        });
    } catch (error) {
        ('Error Deleting Product', error);
        dispatch({ type: 'ERROR', payload: error.message });
    }
};

export const editProductAction = (productId, editedProduct) => async (dispatch) => {
    dispatch({ type: 'LOADING' });
    try {
        const updatedProduct = await editProduct(productId, editedProduct);
        dispatch({
            type: EDIT_PRODUCT,
            payload: updatedProduct
        })
        // to make sure the latest data is in the stoer
        const fetchedProduct = await fetchProductById(productId);  
        dispatch({  
            type: FETCH_PRODUCT_BY_ID,  
            payload: fetchedProduct  
        });
    } catch (error) {
        ('Error Editing Product', error);
        dispatch({ type: 'ERROR', payload: error.message });
    }
}
