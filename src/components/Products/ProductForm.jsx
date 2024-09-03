import { Button, Input, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';  

export default function ProductForm({ open, isEditing, newProduct, setNewProduct, onSave, onClose }) {  
    return (  
        <Dialog open={open} handler={onClose} className="relative z-40 bg-white max-w-xl mx-auto shadow-xl">  
            <DialogBody>  
                <div className="p-8 font-eb-garamond text-gray-700">  
                    <DialogHeader className="text-2xl font-semibold mb-6 uppercase">{isEditing ? 'Edit Product' : 'Add Product'}</DialogHeader>  
                    <div className="grid grid-cols-1 gap-8 ">  
                        {/* Input Fields */}  
                        {isEditing && (  
                            <Input  
                                type="text"  
                                placeholder="Product ID"  
                                value={newProduct._id}  
                                onChange={(e) => setNewProduct({ ...newProduct, _id: e.target.value })}  
                                className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                                disabled  
                            />  
                        )}  
                        <Input  
                            type="text"  
                            placeholder="Product Name"  
                            value={newProduct.name}  
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="number"  
                            placeholder="Product Price"  
                            value={newProduct.price}  
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="text"  
                            placeholder="Product Description"  
                            value={newProduct.description}  
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="number"  
                            placeholder="Stock"  
                            value={newProduct.stock}  
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="text"  
                            placeholder="Product Image URL"  
                            value={newProduct.image}  
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="text"  
                            placeholder="Status"  
                            value={newProduct.status}  
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                        <Input  
                            type="text"  
                            placeholder="Category Name"  
                            value={newProduct.categoryName}  
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}  
                            className="w-full border-b border-gray-400 p-2 placeholder-gray-500"  
                        />  
                    </div>  
                </div>  
            </DialogBody>  
            <DialogFooter className='ml-8 mb-2'>  
                <Button onClick={onClose} className="mr-8 text-main font-bold">  
                    Cancel  
                </Button>  
                <Button onClick={onSave} className='text-main font-bold'>  
                    {isEditing ? 'Update Product' : 'Add Product'}  
                </Button>  
            </DialogFooter>  
        </Dialog>  
    );  
}  
