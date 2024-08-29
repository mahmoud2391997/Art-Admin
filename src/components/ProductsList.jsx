import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction, deleteProductAction, addProductAction, editProductAction } from '../Redux/actions/productsActions';
import { Button, Card, Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Spinner } from '@material-tailwind/react';

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
        setNewProduct({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image,
            status: product.status,
            categoryId: product.categoryId
        });
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (newProduct._id) {
            dispatch(editProductAction(newProduct._id, newProduct));
            setEditingProduct(null);
            setNewProduct({
                _id: '', name: '', price: '', description: '', stock: '', image: '', status: '', categoryId: ''
            });
            setIsEditing(false);
        }
    };

    const handleAddProduct = () => {
        dispatch(addProductAction(newProduct));
        setNewProduct({
            _id: '', name: '', price: '', description: '', stock: '', image: '', status: '', categoryId: ''
        });
        setIsAdding(false);
    };

    return (
        <div className="p-6 space-y-6">
            <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold">
                Product List
            </Typography>

            {/* Add Product Button */}
            <Button color="blue" onClick={() => setIsAdding(true)} className="w-full md:w-auto mx-auto">
                Add New Product
            </Button>

            {/* Loading Indicator */}
            {status === 'loading' && (
                <div className="flex justify-center items-center h-32">
                    <Spinner />
                </div>
            )}

            {/* Error Handling */}
            {status === 'error' && (
                <div className="p-4 bg-red-100 text-red-600 border border-red-200 rounded-md">
                    There was an error loading products. Please try again later.
                </div>
            )}

            {/* Product Cards */}
            {status === 'success' && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product._id} className="p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                            <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold text-lg">
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="blue-gray" className="mb-4 text-xl font-medium">
                                ${product.price.toFixed(2)}
                            </Typography>
                            <div className="flex gap-2">
                                <Button color="blue" onClick={() => handleEdit(product)} className="w-full">
                                    Edit
                                </Button>
                                <Button color="red" onClick={() => {
                                    setProductToDelete(product);
                                    setShowConfirmDelete(true);
                                }} className="w-full">
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Typography variant="h6" color="blue-gray" className="text-center mt-6">
                    No products available.
                </Typography>
            )}

            {/* Add/Edit Product Dialog */}
            <Dialog open={isAdding || isEditing} handler={() => { setIsAdding(false); setIsEditing(false); }} className="max-w-md mx-auto">
                <DialogHeader>{isEditing ? 'Edit Product' : 'Add Product'}</DialogHeader>
                <DialogBody>
                    <div className="space-y-4">
                        {isEditing && (
                            <Input
                                type="text"
                                label="Product ID"
                                value={newProduct._id}
                                onChange={(e) => setNewProduct({ ...newProduct, _id: e.target.value })}
                                className="my-2"
                                disabled
                            />
                        )}
                        <Input
                            type="text"
                            label="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="my-2"
                        />
                        <Input
                            type="number"
                            label="Product Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="my-2"
                        />
                        <Input
                            type="text"
                            label="Product Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="my-2"
                        />
                        <Input
                            type="number"
                            label="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                            className="my-2"
                        />
                        <Input
                            type="text"
                            label="Product Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            className="my-2"
                        />
                        <Input
                            type="text"
                            label="Status"
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                            className="my-2"
                        />
                        <Input
                            type="text"
                            label="Category ID"
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            className="my-2"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={() => { setIsAdding(false); setIsEditing(false); }}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="blue"
                        onClick={isEditing ? handleUpdate : handleAddProduct}
                    >
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={showConfirmDelete} handler={() => setShowConfirmDelete(false)} className="max-w-md mx-auto">
                <DialogHeader>Confirm Delete</DialogHeader>
                <DialogBody>
                    <Typography variant="h6" color="blue-gray">
                        Are you sure you want to delete this product? This action cannot be undone.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={handleDelete}
                        className="mr-2"
                    >
                        Delete
                    </Button>
                    <Button
                        color="blue"
                        onClick={() => setShowConfirmDelete(false)}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default ProductList;
