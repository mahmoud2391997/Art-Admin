import axios from 'axios';

export const addProduct = async (product) => {
    try {
    const response = await axios.post(
        `https://art-ecommerce-server.glitch.me/admin/products`, product,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA`
        }}
        )
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
        const response = await axios.delete(
        `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
        {headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA`
        }}
        )
        return response.data;
    } catch (error) {
        console.log('Error deleting product:', error);
        throw error;
    }
};

export const editProduct = async (productId, editedProduct) => {
    try {
        const response = await axios.put(
        `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
        editedProduct,{headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA`
        }}
        )
        return response.data;
    } catch (error) {
        console.log('Error editing product:', error);
        throw error;
    }
};
