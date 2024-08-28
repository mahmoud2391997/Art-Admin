import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function Users() {


const [customers,setCustomers] = useState([]);
async function getCustomers() {
 await axios
    .get(`https://art-ecommerce-server.glitch.me/api/customers`)
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

  return (
     <div className='w-full p-4 bg-[#f7f9fc]'>


      <div className="rounded-sm  border   border-[#b7cce7] bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white ml-[2.5%]">
            Customers
          </h4>
        </div>
  
        <div className="bg-[#f7f9fc] border-t border-[#b7cce7] h-14 grid grid-cols-6 border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
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
  
        {customers.map((customer, key) => (

          <div
            className={`grid ${key % 2 != 0 ? "bg-white" : "bg-gray-200"}   grid-cols-6 h-20 border-t border-[#b7cce7] py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5`}
            key={key}
          >
            <div className="col-span-1 flex items-center">
              
                <p className=" text-black dark:text-white text-center w-full text-xs  sm:text-base">
                  {customer.name}
                </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className=" text-black dark:text-white text-center w-full  text-xs sm:text-base">
                {customer.address}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className=" text-black dark:text-white text-center w-full  text-xs  sm:text-base">
                {customer.phone}
              </p>
            </div>
           
            <div className="col-span-2 flex items-center">
              <p className=" text-meta-3 text-center w-full  text-xs  sm:text-base">{customer.email}</p>
            </div>
          </div>
        ))}
      </div>
     </div>
  )
}
