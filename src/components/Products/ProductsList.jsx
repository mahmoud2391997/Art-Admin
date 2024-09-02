import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { fetchProductsAction, deleteProductAction, addProductAction, editProductAction } from '../../Redux/actions/productsActions';  
import { Typography, Spinner } from '@material-tailwind/react';  
import ProductForm from './ProductForm';  
import ConfirmDelete from './ConfirmDelete';  
import ProductCard from './ProductCard';  
import MainButton from '../Shared/MainButton/MainButton';  
import titleImg from '../../assets/images/title-img.jpeg';  

const ProductList = () => {  
    const dispatch = useDispatch();  
    const { products, status } = useSelector((state) => state.products);  

    const [isEditing, setIsEditing] = useState(false);  
    const [isAdding, setIsAdding] = useState(false);  
    const [editingProduct, setEditingProduct] = useState(null);  
    const [newProduct, setNewProduct] = useState({     
        name: '',   
        description: '',   
        price: 0,  // Initialize stock as a number  
        image: '',   
        status: '',   
        categoryName: ''  
    });  
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);  
    const [productToDelete, setProductToDelete] = useState(null);  
    const [loading, setLoading] = useState(true);  

    useEffect(() => {  
        const fetchData = async () => {  
            setLoading(true);   
            dispatch(fetchProductsAction());  
            setLoading(false);  
        };  
        fetchData();  
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
            resetForm();  
            setIsEditing(false);  
        }  
    };  

    const handleAddProduct = () => {  
        dispatch(addProductAction(newProduct));  
        resetForm();  
        setIsAdding(false);  
    };  

    const resetForm = () => {  
        setNewProduct({   
            name: '',   
            description: '',   
            price: 0,  // Initialize price as a number  
            stock: 0,  // Initialize stock as a number  
            image: '',   
            status: '',   
            categoryName: ''   
        });  
    };  

    return (  
        <div className="relative bg-white flex flex-col items-center pb-16 mb-10">  
            <div className="relative w-full h-40 overflow-hidden bg-white">  
                <img  
                    className="absolute inset-0 w-full h-full object-cover"  
                    src={titleImg}  
                    alt="Products List"  
                />  
                <div className="absolute top-1/2 left-0 z-10 w-full text-start transform -translate-y-1/2">  
                    <h3 className="text-2xl md:text-4xl p-4 font-eb-garamond text-white uppercase tracking-wide leading-tight shadow-md">  
                        Products  
                    </h3>  
                </div>  
            </div> 

            {loading ? (  
                <div className="flex items-center justify-center min-h-[200px]">  
                    <Spinner className="h-20 w-20 text-main spinner-animation" />  
                </div>   
            ) : (  
                <div className='px-4 py-6'>  
                    <div className="flex justify-start mb-6 ml-4">  
                        <MainButton  
                            title="Add New Product"  
                            onClick={() => {  
                                setIsAdding(true);  
                                resetForm();  
                            }}  
                        />  
                    </div>  
                    <div>  
                        {status === 'success' && products.length > 0 ? (  
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">  
                                {products.map((product) => (  
                                    <ProductCard  
                                        key={product._id}  
                                        product={product}  
                                        onEdit={() => handleEdit(product)}  
                                        onDelete={() => {  
                                            setProductToDelete(product);  
                                            setShowConfirmDelete(true);  
                                        }}  
                                        className="mb-6"  
                                    />  
                                ))}  
                            </div>  
                        ) : status === 'error' ? (  
                            <Typography variant="h6" color="blue-gray" className="text-center mt-6 mb-6">  
                                There was an error loading products. Please try again later.  
                            </Typography>  
                        ) : null}  
                    </div>  
                </div>  
            )}  

            <ProductForm  
                open={isAdding || isEditing}  
                isEditing={isEditing}  
                newProduct={newProduct}  
                setNewProduct={setNewProduct}  
                onSave={isEditing ? handleUpdate : handleAddProduct}  
                onClose={() => {   
                    setIsAdding(false);   
                    setIsEditing(false);   
                    resetForm();  
                }}  
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