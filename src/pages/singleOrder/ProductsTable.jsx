/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
// import emptyProduct from '../../assets/images/emptyProduct.gif'
import EmptyPage from "../../component/EmptyPage";

export default function ProductsTable({ orderItems }) {
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-white">
      {/* <h2 className="text-xl font-bold mt-6 mb-4">Products</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-4 font-eb-garamond font-bold border-b text-xs sm:text-sm md:text-base lg:text-lg text-[#525252] py-3 bg-gray-100">
        <div className="font-eb-garamond text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">Product Name</div>
        <div className="font-eb-garamond text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">Price</div>
        <div className="font-eb-garamond text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">Quantity</div>
        <div className="font-eb-garamond text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">Subtotal</div>
      </div>
      {orderItems && orderItems.orderItems && orderItems.orderItems.length > 0 ? (
        orderItems.orderItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 sm:grid-cols-4 border-b border-gray-200 py-2 sm:py-4 items-center"
          >
            <div className="font-eb-garamond text-center sm:text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">
              {item.productName}
            </div>
            <div className="font-eb-garamond text-center sm:text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">
              {item.productPrice} $
            </div>
            <div className="font-eb-garamond text-center sm:text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">
              {item.productQuantity}
            </div>
            <div className="font-eb-garamond text-center sm:text-left text-xs sm:text-sm md:text-base px-2 sm:px-4">
              {item.productPrice * item.productQuantity} $
            </div>
          </div>
        ))
      ) : (
        <EmptyPage/>
        // <img src={emptyProduct} className="flex justify-center items-center mx-auto"/>
      )}
    </div>
  );
}
