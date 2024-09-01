// ProductForm Component
import { Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export default function ProductForm({ open, isEditing, newProduct, setNewProduct, onSave, onClose }) {
    return (
        <Dialog open={open} handler={onClose} className="max-w-md mx-auto">
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
                        label="Category Name"
                        value={newProduct.categoryName}
                        onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
                        className="my-2"
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button color="red" onClick={onClose} className="mr-2">
                    Cancel
                </Button>
                <Button color="blue" onClick={onSave}>
                    {isEditing ? 'Update Product' : 'Add Product'}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
