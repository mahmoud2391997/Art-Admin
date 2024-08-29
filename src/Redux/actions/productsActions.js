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

export const fetchProductByIdAction = (productId) => async (dispatch) => {
    try {
        const product = await fetchProductById(productId);
        dispatch({
            type: FETCH_PRODUCT_BY_ID,
            payload: product
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
