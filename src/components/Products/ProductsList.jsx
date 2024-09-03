import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAction,
  deleteProductAction,
  addProductAction,
  editProductAction,
} from "../../Redux/actions/productsActions";
import { Typography, Spinner } from "@material-tailwind/react";
import ProductForm from "./ProductForm";
import ConfirmDelete from "./ConfirmDelete";
import ProductCard from "./ProductCard";
import MainButton from "../Shared/MainButton/MainButton";
import titleImg from "../../assets/images/title-img.jpeg";
import SearchBar from "../Shared/SearchBar";
import Pagination from "../Pagination";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageProducts, setPageProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    status: "",
    category: "",
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
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProductsAction());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filtered =
      searchedProduct === ""
        ? products
        : products.filter((product) =>
            product.name
              ? product.name
                  .toLowerCase()
                  .includes(searchedProduct.toLowerCase())
              : false
          );

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
    setPageProducts(
      filtered.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    );
  }, [products, searchedProduct, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchedProduct]);

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

  const handleUpdate = async () => {
    if (newProduct._id) {
      await dispatch(editProductAction(newProduct._id, newProduct));
      await dispatch(fetchProductsAction());
      resetForm();
      setIsEditing(false);
    }
  };

  const handleAddProduct = async () => {
    await dispatch(addProductAction(newProduct));
    resetForm();
    setIsAdding(false);
    await dispatch(fetchProductsAction());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      status: "",
      category: "",
    });
  };

  useEffect(() => {
    const filtered =
      searchedProduct === ""
        ? products
        : products.filter((product) =>
            product.name
              ? product.name
                  .toLowerCase()
                  .includes(searchedProduct.toLowerCase())
              : false
          );

    setFilteredProducts(filtered);
  }, [products, searchedProduct]);

  return (
    <div className="relative bg-white flex flex-col items-center pb-16 mb-10">
      {/* <div className="relative w-full h-40 overflow-hidden bg-white">  
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
            </div> */}

      <div className="w-full ">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <SearchBar
            setSearchTerm={setSearchedProduct}
            placeholder={"Search For Products by Name"}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Spinner className="h-20 w-20 text-main spinner-animation" />
        </div>
      ) : (
        <div className="px-4 py-6">
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
            {status === "success" && filteredProducts.length > 0 ? (
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
            ) : status === "error" ? (
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center mt-6 mb-6"
              >
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
      <div className="w-full flex justify-center mt-6">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
