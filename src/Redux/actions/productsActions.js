import { ADD_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT_BY_ID, DELETE_PRODUCT, EDIT_PRODUCT } from "../actionTypes";
import { addProduct, fetchProducts, fetchProductById, deleteProduct, editProduct } from "../api/productsApi";

export const addProductAction = (product) => async (dispatch) => {
    try {
        const newProduct = await addProduct(product);
        dispatch({
            type: ADD_PRODUCT,
            payload: newProduct
        });
    } catch (error) {
        console.log('Error Adding Product', error);
    }
};

export const fetchProductsAction = () => async (dispatch) => {
    try {
        const products = await fetchProducts();
        dispatch({
            type: FETCH_PRODUCTS,
            payload: products
        });
    } catch (error) {
        console.log('Error Fetching Products', error);
    }
};

export const fetchProductByIdAction = (productId) => async (dispatch, getState) => {
    // Check if the product is in local storage
    const storedProduct = localStorage.getItem(`product_${productId}`);
    
    if (storedProduct) {
        // If found in local storage then dispatch it to Redux
        const product = JSON.parse(storedProduct);
        dispatch({
            type: FETCH_PRODUCT_BY_ID,
            payload: product,
        });
        return;
    }

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
        const product = await fetchProductByID(productId);
        // Store the fetched product in local storage
        localStorage.setItem(`product_${productId}`, JSON.stringify(product));
        dispatch({
            type: FETCH_PRODUCT_BY_ID,
            payload: product,
        });
    } catch (error) {
        console.log('Error Fetching Product', error);
    }
};

export const deleteProductAction = (productId) => async (dispatch) => {
    try {
        await deleteProduct(productId);
        dispatch({
            type: DELETE_PRODUCT,
            payload: productId
        });
    } catch (error) {
        console.log('Error Deleting Product', error);
    }
};

export const editProductAction = (productId, editedProduct) => async (dispatch) => {
    try {
        const updatedProduct = await editProduct(productId, editedProduct);
        dispatch({
            type: EDIT_PRODUCT,
            payload: updatedProduct
        })
    } catch (error) {
        console.log('Error Editing Product', error);
    }
}
