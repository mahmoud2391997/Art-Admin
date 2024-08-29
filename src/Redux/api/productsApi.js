import axios from 'axios';

export const addProduct = async (product) => {
    try {
        const response = await axios.post('https://art-ecommerce-server.glitch.me/api/products', product);
        return response.data;
    } catch (error) {
        console.log('Error adding product:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://art-ecommerce-server.glitch.me/api/products');
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`https://art-ecommerce-server.glitch.me/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching product by ID:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`https://art-ecommerce-server.glitch.me/api/products/${productId}`);
        return productId;
    } catch (error) {
        console.log('Error deleting product:', error);
        throw error;
    }
};


export const editProduct = async (productId, editedProduct) => {
    try {
        const response = await axios.put(
            `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
            editedProduct
        );
        return response.data;
    } catch (error) {
        console.log('Error editing product:', error);
        throw error;
    }
};
