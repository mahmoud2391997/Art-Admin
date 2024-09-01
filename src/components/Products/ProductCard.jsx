import { Button, Card, Typography, CardBody } from '@material-tailwind/react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';  

export default function ProductCard({ product, onEdit, onDelete }) {  
    return (  
        <div className='p-3 w-full max-w-sm'>  
            <Card className="relative flex flex-col items-center group rounded-lg shadow-lg  p-3">  
                <div className="relative w-full mb-4 overflow-hidden">  
                    <img  
                        src={product.image}  
                        alt={product.name}  
                        className="w-full h-60 object-cover transition-transform duration-300 transform group-hover:scale-105"  
                    />  
                </div>  
                <CardBody className="flex flex-col items-center justify-between h-32">  
                    <Typography  
                        variant="h5"  
                        color="blue-gray"  
                        className="text-center sm:text-lg font-eb-garamond text-base leading-5 tracking-wide"  
                    >  
                        {product.name}  
                    </Typography>  
                    <div className="w-full text-center">  
                        <span className="text-lg font-semibold">{product.price}$</span>  
                    </div>  
                    <div className="flex gap-4 mt-4 w-full">  
                        <Button 
                            onClick={() => onEdit(product)}  
                            className="flex-1 flex items-center justify-center text-lg text-black"  
                        >  
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />     
                        </Button>  
                        <Button  
                            onClick={() => onDelete(product)}  
                            className="flex-1 flex items-center justify-center text-lg text-red-500 hover:text-red-700"  
                        >  
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />  
                        </Button>  
                    </div>  
                </CardBody>  
            </Card>  
        </div>  
    );  
}