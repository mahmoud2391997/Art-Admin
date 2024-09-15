import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { fetchProductsAction, deleteProductAction, addProductAction, editProductAction } from '../../Redux/actions/productsActions';  
import { Typography, Spinner } from '@material-tailwind/react';  
import ProductForm from './ProductForm';  
import ConfirmDelete from './ConfirmDelete';  
import ProductCard from './ProductCard';  
import MainButton from '../Shared/MainButton/MainButton';  
import SearchBar from '../Shared/SearchBar';
import Pagination from '../Shared/Pagination';

const ProductList = () => {  
    const dispatch = useDispatch();  
    const { products, status } = useSelector((state) => state.products);  
    const [searchedProduct, setSearchedProduct] = useState('');  
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pageProducts, setPageProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditing, setIsEditing] = useState(false);  
    const [isAdding, setIsAdding] = useState(false);  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);  
    const [newProduct, setNewProduct] = useState({     
        name: '',   
        description: '',   
        price: 0,
        stock: 0,
        image: '',   
        status: '',   
        category: ''  
    });  
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);  
    const [productToDelete, setProductToDelete] = useState(null);  
    const [loading, setLoading] = useState(true); 
    const productsPerPage = 6; 

    useEffect(() => {  
        const fetchData = async () => {  
            setLoading(true);   
            await dispatch(fetchProductsAction());  
            setLoading(false);  
        };  
        fetchData();  
    }, [dispatch]);

    useEffect(() => {
        const filtered = searchedProduct === ''
            ? products
            : products.filter(product =>
                product.name ? product.name.toLowerCase().includes(searchedProduct.toLowerCase()) : false
            );

        setFilteredProducts(filtered);
        setTotalPages(Math.ceil(filtered.length / productsPerPage));
        setPageProducts(filtered.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
    }, [products, searchedProduct, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchedProduct]);

    const handleDelete = async () => {  
        if (productToDelete) {  
            await dispatch(deleteProductAction(productToDelete._id));  
            await dispatch(fetchProductsAction());

            const newTotalPages = Math.ceil((filteredProducts.length - 1) / productsPerPage);
            setTotalPages(newTotalPages);
    
            if (pageProducts.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
            
            setShowConfirmDelete(false);  
        }  
    };

    const handleEdit = (product) => {  
        setEditingProduct(product);  
        setNewProduct({ ...product });  
        setIsEditing(true);  
    };  

    const handleUpdate = async() => {  
        if (newProduct._id) {
            setIsSubmitting(true);  
            await dispatch(editProductAction(newProduct._id, newProduct));  
            await dispatch(fetchProductsAction());  
            resetForm();  
            setIsEditing(false);
            setIsSubmitting(false);  
        }  
    };  

    const handleAddProduct = async () => {
        setIsSubmitting(true);  
        await dispatch(addProductAction(newProduct));  
        await dispatch(fetchProductsAction());
    
        setCurrentPage(1);
        resetForm();  
        setIsAdding(false);
        setIsSubmitting(false);  
    };
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const resetForm = () => {  
        setNewProduct({   
            name: '',   
            description: '',   
            price: 0,  
            stock: 0,    
            image: '',   
            status: '',   
            category: ''   
        });  
    };  

    return (  
        <div className="relative bg-white flex flex-col items-center pb-16 mb-10">  
            <div className='w-full '>
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <SearchBar setSearchTerm={setSearchedProduct} placeholder={"Search For Products by Name"} />
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
                        {status === 'success' && filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {pageProducts.map((product) => (
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
                        ) : (
                            <Typography variant="h6" color="blue-gray" className="text-center mt-6 mb-6">  
                                No products found.  
                            </Typography>  
                        )}  
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
                isSubmitting={isSubmitting}
            />  

            <ConfirmDelete  
                open={showConfirmDelete}  
                onConfirm={handleDelete}  
                onCancel={() => setShowConfirmDelete(false)}  
                className="mb-6"
                isSubmitting={isSubmitting}  
            />
            <div className='w-full flex justify-center mt-6'>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>  
        </div>  

    );  
};  

export default ProductList;
