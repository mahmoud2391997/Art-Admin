/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function OrdersTotals({ orderItems }) {
  const calculateTotalPrice = () => {
    if (!orderItems || !orderItems.orderItems) return 0;
    const subtotal = orderItems.orderItems.reduce((total, item) => total + (item.productPrice * item.productQuantity), 0);
    const shippingCost = 50; // assuming shipping cost is fixed
    return subtotal + shippingCost;
  };

  const calculateTotalQuantity = () => {
    if (!orderItems || !orderItems.orderItems) return 0;
    return orderItems.orderItems.reduce((total, item) => total + item.productQuantity, 0);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="border-b text-[#525252] py-2 sm:py-3 md:py-4 mb-4">
        <h4 className="font-eb-garamond uppercase font-bold text-base sm:text-lg md:text-xl tracking-widest text-left">
          Order Totals
        </h4>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border-b text-[#525252] py-2 sm:py-3 md:py-4 mb-4">
        <div className="w-full sm:w-1/2 font-eb-garamond text-left text-xs sm:text-sm md:text-base">
          <strong>Order Number:</strong>
        </div>
        <div className="w-full sm:w-1/2 font-eb-garamond text-right text-xs sm:text-sm md:text-base">
          {orderItems.orderNumber}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border-b text-[#525252] py-2 sm:py-3 md:py-4 mb-4">
        <div className="w-full sm:w-1/2 font-eb-garamond text-left text-xs sm:text-sm md:text-base">
          <strong>Shipping:</strong>
        </div>
        <div className="w-full sm:w-1/2 font-eb-garamond text-right text-xs sm:text-sm md:text-base">
          50$
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border-b text-[#525252] py-2 sm:py-3 md:py-4 mb-4">
        <div className="w-full sm:w-1/2 font-eb-garamond text-left text-xs sm:text-sm md:text-base">
          Total Price
        </div>
        <div className="w-full sm:w-1/2 font-eb-garamond text-right text-xs sm:text-sm md:text-base">
          {calculateTotalQuantity()}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border-b text-[#525252] py-2 sm:py-3 md:py-4 mb-4">
        <div className="w-full sm:w-1/2 font-eb-garamond text-left text-xs sm:text-sm md:text-base">
          Total Products Ordered
        </div>
        <div className="w-full sm:w-1/2 font-eb-garamond text-right text-xs sm:text-sm md:text-base">
          {calculateTotalPrice()}$
        </div>
      </div>
    </div>
  );
}
