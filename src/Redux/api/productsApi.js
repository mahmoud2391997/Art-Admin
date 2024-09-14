import axios from 'axios';

export const addProduct = async (product) => {
    try {
    const response = await axios.post(
        `https://art-ecommerce-server.glitch.me/admin/products`, product,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }}
        )
        return response.data;
    } catch (error) {
        ('Error adding product:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://art-ecommerce-server.glitch.me/api/products');
        return response.data;
    } catch (error) {
        ('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`https://art-ecommerce-server.glitch.me/api/products/${productId}`);
        return response.data;
    } catch (error) {
        ('Error fetching product by ID:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(
        `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }}
        )
        return response.data;
    } catch (error) {
        ('Error deleting product:', error);
        throw error;
    }
};

export const editProduct = async (productId, editedProduct) => {
    try {
        const response = await axios.put(
        `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
        editedProduct,{headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }}
        )
        return response.data;
    } catch (error) {
        ('Error editing product:', error);
        throw error;
    }
};
