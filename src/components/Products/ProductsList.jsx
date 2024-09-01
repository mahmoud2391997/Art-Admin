// ProductList Component
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction, deleteProductAction, addProductAction, editProductAction } from '../../Redux/actions/productsActions';
import { Typography, Spinner, Button } from '@material-tailwind/react';
import ProductForm from './ProductForm';
import ConfirmDelete from './ConfirmDelete';
import ProductCard from './ProductCard';
import MainButton from '../Shared/MainButton/MainButton';
import titleImg from '../../assets/images/title-img.jpeg'

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);

    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        _id: '', name: '', price: '', description: '', stock: '', image: '', status: '', categoryId: ''
    });
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch]);

    const handleDelete = () => {
        if (productToDelete) {
            dispatch(deleteProductAction(productToDelete._id));
            setShowConfirmDelete(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({ ...product });
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (newProduct._id) {
            dispatch(editProductAction(newProduct._id, newProduct));
            setEditingProduct(null);
            setNewProduct({ name: '', price: '', description: '', stock: '', image: '', status: '', categoryId: '' });
            setIsEditing(false);
        }
    };

    const handleAddProduct = () => {
        console.log(newProduct)
        dispatch(addProductAction(newProduct));
        setNewProduct({ name: '', price: '', description: '', stock: '', image: '', status: '', categoryId: '' });
        setIsAdding(false);
    };

    return (
<div className="p-10 space-y-6">  
    <div className="relative overflow-hidden w-full h-[150px] bg-white">
        <img
            className="absolute w-full h-full object-cover animate-moveVertical"
            src={titleImg}
            alt="Products List"
        />
        <div className="absolute top-1/2 left-0 z-10 p-4 transform -translate-y-1/2">
            <h3 className="text-xl sm:text-2xl md:text-3xl p-20 font-eb-garamond text-white uppercase tracking-wider leading-[5.1em]">
            Products
            </h3>
        </div>
    </div>  

        {status === 'loading' && (  
            <div className="flex justify-center items-center h-32 mb-6">  
                <Spinner />  
            </div>  
        )}

    <div className='px-4 py-6'>
        <div className="flex justify-start mb-6 ml-4">
            <MainButton  
                title="Add New Product"  
                onClick={() => setIsAdding(true)}  
            />  
        </div>
        <div>
            {status === 'success' && products.length > 0 ? (  
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">  
                    {products.map((product) => (  
                        <ProductCard  
                            key={product._id}  
                            product={product}  
                            onEdit={() => handleEdit(product)}  
                            onDelete={() => {  
                                setProductToDelete(product);  
                                setShowConfirmDelete(true);  
                            }}  
                            className="mb-6" // Ensure consistent margin for each ProductCard  
                        />  
                    ))}  
                </div>  
            ) : (  
                <Typography variant="h6" color="blue-gray" className="text-center mt-6 mb-6">  
                    No products available.  
                </Typography>  
            )}  
        </div>  
    </div>     


    {status === 'error' && (  
        <div className="p-4 bg-red-100 text-red-600 border border-red-200 rounded-md mb-6">  
            There was an error loading products. Please try again later.  
        </div>  
    )}  


    <ProductForm  
        open={isAdding || isEditing}  
        isEditing={isEditing}  
        newProduct={newProduct}  
        setNewProduct={setNewProduct}  
        onSave={isEditing ? handleUpdate : handleAddProduct}  
        onClose={() => { setIsAdding(false); setIsEditing(false); }}  
        className="mb-6" 
    />  

    <ConfirmDelete  
        open={showConfirmDelete}  
        onConfirm={handleDelete}  
        onCancel={() => setShowConfirmDelete(false)}  
        className="mb-6"
    />  
</div>  
    );
};

export default ProductList;
