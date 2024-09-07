import { useState } from 'react';
import { Button, Input, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';  

export default function ProductForm({ open, isEditing, newProduct, setNewProduct, onSave, onClose, isSubmitting }) {
    
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-new') {
            setIsAddingNewCategory(true);
            setNewProduct({ ...newProduct, category: '' }); 
        } else {
            setIsAddingNewCategory(false);
            setNewProduct({ ...newProduct, category: selectedValue });
        }
    };

    const handleCategoryInputChange = (e) => {
        setNewProduct({ ...newProduct, category: e.target.value });
    };

    return (  
        <Dialog open={open} handler={onClose} className="relative z-40 bg-white max-w-xl mx-auto shadow-xl">  
            <DialogBody>  
                <div className="p-8 font-eb-garamond text-gray-700">  
                    <DialogHeader className="text-2xl font-semibold mb-6 uppercase">{isEditing ? 'Edit Product' : 'Add Product'}</DialogHeader>  
                    <div className="grid grid-cols-1 gap-8 ">  
                        {/* Input Fields */}  
                        {isEditing && (  
                            <input  
                                type="text"  
                                placeholder="Product ID"  
                                value={newProduct._id}  
                                onChange={(e) => setNewProduct({ ...newProduct, _id: e.target.value })}  
                                className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                                disabled  
                            />  
                        )}  
                        <input  
                            type="text"  
                            placeholder="Product Name"  
                            value={newProduct.name}  
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <input  
                            type="number"  
                            placeholder="Product Price"  
                            value={newProduct.price}  
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <input  
                            type="text"  
                            placeholder="Product Description"  
                            value={newProduct.description}  
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <input  
                            type="number"  
                            placeholder="Stock"  
                            value={newProduct.stock}  
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <input  
                            type="text"  
                            placeholder="Product Image URL"  
                            value={newProduct.image}  
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <select
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"
                            required
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="available">Available</option>
                            <option value="out of stock">Out of Stock</option>
                        </select> 
                        <select
                            value={isAddingNewCategory ? 'add-new' : newProduct.category}
                            onChange={handleCategoryChange}
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Sculptures">Sculptures</option>
                            <option value="Paintings">Paintings</option>
                            <option value="Pottery">Pottery</option>
                            <option value="Ceramics">Ceramics</option>
                            <option value="add-new">Add New Category</option>
                        </select>
                        {isAddingNewCategory && (
                            <input
                                type="text"
                                placeholder="New Category Name"
                                value={newProduct.category}
                                onChange={handleCategoryInputChange}
                                className="w-full border-b border-gray-400 p-2 placeholder-gray-500"
                                required
                            />
                        )}
                    </div>  
                </div>  
            </DialogBody>  
            <DialogFooter className='ml-8 mb-2'>
                <button onClick={onClose} className="mr-8 text-main font-bold">
                    Cancel
                </button>
                <button 
                    onClick={onSave} 
                    className='text-main font-bold'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Product" : "Add Product")} 
                </button>
            </DialogFooter>
        </Dialog>  
    );  
}  
