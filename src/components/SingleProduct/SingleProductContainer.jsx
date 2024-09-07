    import React, { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { useSelector, useDispatch } from "react-redux";
    import {
    fetchProductByIdAction,
    editProductAction,
    deleteProductAction,
    } from "../../Redux/actions/productsActions";
    import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Button,
    Spinner,
    } from "@material-tailwind/react";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
    import ProductForm from "../Products/ProductForm";
    import ConfirmDelete from "../Products/ConfirmDelete";
    import StaticStarRating from "../Shared/StaticStarRating";
    import SingleProductTabs from "../Shared/SingleProductTabs";
    import MainButton from "../Shared/MainButton/MainButton";

    export default function SingleProductContainer() {
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedProduct, loading, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProductByIdAction(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (selectedProduct) {
        setNewProduct(selectedProduct);
        }
    }, [selectedProduct]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        setShowConfirmDelete(true);
    };

    const handleUpdate = async () => {
        setIsSubmitting(true);
        await dispatch(editProductAction(newProduct._id, newProduct));
        setIsSubmitting(false);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        await dispatch(deleteProductAction(selectedProduct._id));
        setIsSubmitting(false);
        setShowConfirmDelete(false);
        navigate("/products");
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewProduct(selectedProduct);
    };

    const handleCancelDelete = () => {
        setShowConfirmDelete(false);
    };

    if (loading || !newProduct) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner className="h-12 w-12 text-main spinner-animation" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <Typography color="red" className="text-xl">
            Error fetching product details. Please try again later.
            </Typography>
        </div>
        );
    }

    return (
        <div className="relative bg-white flex flex-col items-center pb-16 mb-10">
        <div className="flex ml-4 mt-10 sm:ml-2 sm:mt-6">
            <MainButton title=" &#8592; Products List" onClick={() => navigate('/products')} />
        </div>

        {/* Product Card */}
        <Card className="w-full max-w-5xl mt-8 flex flex-col md:flex-row shadow-lg overflow-hidden">
            <CardHeader
            shadow={false}
            floated={false}
            className="w-full md:w-1/2 flex-shrink-0"
            >
            <img
                src={newProduct.image}
                alt={newProduct.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            </CardHeader>
            <CardBody className="p-6 flex flex-col w-full md:w-1/2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <Typography
                variant="h4"
                color="blue-gray"
                className="uppercase font-semibold font-eb-garamond text-xl md:text-2xl"
                >
                {newProduct.name}
                </Typography>
                <div className="flex gap-2 mt-2 md:mt-0">
                <Button
                    onClick={handleEditClick}
                    variant="text"
                    color="blue"
                    className="flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                </Button>
                <Button
                    onClick={handleDeleteClick}
                    variant="text"
                    color="red"
                    className="flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </Button>
                </div>
            </div>
            <div className="mb-4">
                <StaticStarRating rating={newProduct.rating || 4} />
            </div>
            <Typography className="mb-2 text-xl font-bold text-main font-eb-garamond">
                ${newProduct.price}
            </Typography>
            <Typography className="mb-2 text-gray-600 font-eb-garamond">
                <span className="font-semibold">Stock:</span> {newProduct.stock}
            </Typography>
            <Typography color="gray" className="mt-4 mb-8 font-eb-garamond">
                {newProduct.description}
            </Typography>
            <Typography className="mb-2 font-medium text-gray-700 font-eb-garamond">
                <span className="font-semibold">Status:</span> {newProduct.status}
            </Typography>
            <Typography className="mb-2 font-medium text-gray-700 font-eb-garamond">
                <span className="font-semibold">Category:</span>{" "}
                {newProduct.categoryName || "N/A"}
            </Typography>
            </CardBody>
        </Card>

        <div className="w-full mt-6">
            <div className="flex justify-center items-center">
            <SingleProductTabs />
            </div>
        </div>

        {isEditing && (
            <ProductForm
            open={isEditing}
            isEditing={true}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onSave={handleUpdate}
            onClose={handleCancelEdit}
            isSubmitting={isSubmitting}
            />
        )}

        {/* Confirm Delete Modal */}
        {showConfirmDelete && (
            <ConfirmDelete
            open={showConfirmDelete}
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
            />
        )}
        </div>
    );
    }
