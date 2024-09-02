import { useEffect } from "react";  
import { useParams } from "react-router-dom";  
import { useSelector, useDispatch } from "react-redux";  
import { fetchProductByIdAction } from '../Redux/actions/productsActions';  
import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";  
import titleImg from "../assets/images/title-img.jpeg";  
import StaticStarRating from "../components/Shared/StaticStarRating";  
import SingleProductTabs from "../components/Shared/SingleProductTabs";  

export default function SingleProduct() {  
    const { productId } = useParams();  
    const dispatch = useDispatch();  
    const selectedProduct = useSelector((state) => state.products.selectedProduct);  

    useEffect(() => {  
        dispatch(fetchProductByIdAction(productId));  
    }, [dispatch, productId]);  

    if (!selectedProduct) return <p>Product Not Found</p>;  

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
                        Product  
                    </h3>  
                </div>  
            </div>   
            <Card className="w-full max-w-3xl mt-8 flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">  
                <CardHeader shadow={false} floated={false} className="w-full md:w-1/2 flex-shrink-0">  
                    <img  
                        src={selectedProduct.image}  
                        alt="card-image"  
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"  
                    />  
                </CardHeader>  
                <CardBody className="p-6 flex flex-col">  
                    <Typography className="mb-4 uppercase font-semibold text-lg">  
                        {selectedProduct.name}  
                    </Typography>  
                    <div className="mb-6">  
                        <StaticStarRating rating={selectedProduct.rating || 4} />  
                    </div>  
                    <Typography className="mb-2 text-xl font-bold">  
                        ${selectedProduct.price}  
                    </Typography>  
                    <Typography className="mb-2 text-gray-600">  
                        In Stock: {selectedProduct.stock}  
                    </Typography>  
                    <Typography color="gray" className="mt-4 mb-8">  
                        {selectedProduct.description}  
                    </Typography>  
                    <Typography className="mb-2 font-medium text-gray-700">  
                        Status: {selectedProduct.status}  
                    </Typography>  
                    <Typography className="mb-2 font-medium text-gray-700">  
                        Category: {selectedProduct.category}  
                    </Typography>  
                </CardBody>  
            </Card>  
            <div className="w-full mt-6">  
                <div className="flex justify-center items-center">  
                    <SingleProductTabs />  
                </div>  
            </div>  
        </div>  
    )  
}