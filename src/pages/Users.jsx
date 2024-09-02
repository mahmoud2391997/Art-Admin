import React, { useEffect, useState } from 'react'
import axios from "axios"
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
export default function Users() {


const [customers,setCustomers] = useState([]);
const [pageCustomers,setPageCustomer] = useState([]);
const [currentPage,setCurrentPage] = useState(1);
const [totalPages,setTotalPages] = useState(null);
const [searchedCustomer,setSearchedCustomer] = useState("");
const customerPerPages = 5;
const handlePageChange = (pageNumber)=>{
setCurrentPage(pageNumber)
}
async function getCustomers() {
 let token =  sessionStorage.getItem("token");
  console.log(token);
  
 await axios
    .get(`https://art-ecommerce-server.glitch.me/admin/customers`,{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then((res)=>{
      console.log(res.data)

      setCustomers(res.data)
    } 
  
  ).catch((error) => {
      console.error(error);
    });

}
useEffect(()=>{
  console.log("asdasd");
  
  getCustomers();
},[])
useEffect(()=>{
  
  if (customers.length) {
    console.log(customers.slice((currentPage - 1) * customerPerPages ,currentPage  * customerPerPages ));
    console.log(customers.length / customerPerPages);
    const filteredCustomers = searchedCustomer == "" ? [...customers] : [...customers].filter((customer)=> customer.name ? customer.name.toLowerCase().includes(searchedCustomer.toLowerCase()):false);
    setPageCustomer(filteredCustomers.slice((currentPage - 1) * customerPerPages ,currentPage  * customerPerPages ));
    setTotalPages(filteredCustomers.length / customerPerPages);
  }

},[customers,currentPage,searchedCustomer]);
useEffect(()=>{
  setCurrentPage(1)
},[searchedCustomer])

  return (
     <div className='w-full  sm:p-4  flex flex-col justify-start h-screen relative'>


      <div className="rounded-sm  border w-full  bg-white shadow-lg  border-gray-300 ">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <SearchBar setSearchTerm={setSearchedCustomer} placeholder={" Search For Customers by Customer Name"}/>
        </div>
  
        <div className=" border-t bg-[#eeeeee] h-14 grid grid-cols-6 border-stroke py-4.5 px-4 sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-center w-full text-sm sm:text-base">Customer Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex text-sm sm:text-base">
            <p className="font-medium text-center w-full">Address</p>
          </div>
          <div className="col-span-2 flex items-center text-sm sm:text-base">
            <p className="font-medium text-center w-full">Phone</p>
          </div>
          <div className="col-span-2 flex items-center text-center w-full text-sm sm:text-base">
            <p className="font-medium text-center w-full">Email</p>
          </div>
         
        </div>
  
        {pageCustomers.length ?  pageCustomers.map((customer, key) => (

          <div
            className={`grid bg-white sm:text-sm  grid-cols-6 h-20 border-b border-gray-300  py-4.5  dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5`}
            key={key}
          >
            <div className="col-span-1 flex items-center">
              
                <p className=" text-black dark:text-white text-center w-full text-xs md:text-base">
                  {customer.name}
                </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className=" text-black dark:text-white text-center w-full  text-xs md:text-base">
                {customer.address}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className=" text-black dark:text-white text-center w-full  text-xs  md:text-base">
                {customer.phone}
              </p>
            </div>
           
            <div className="col-span-2 flex items-center">
              <p className=" text-meta-3 text-center w-full  text-xs md:text-base">{customer.email}</p>
            </div>
          </div>
        ))
        : null
      } 
        </div>
        <div className='w-full absolute bottom-0 left-0 mb-4'>

<div className='max-w-[40%] m-auto flex justify-center'>
{
  pageCustomers.length ?
  <Pagination currentPage={currentPage} totalPages={Math.ceil(totalPages)} handlePageChange={handlePageChange}/>
  : null
}
</div>
  </div>
     </div>
  )
}
