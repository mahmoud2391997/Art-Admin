/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function CustomerInformation({ customer }) {
  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-lg">
      <div className="border-b text-[#525252] py-4 mb-6">
        <h4 className="font-eb-garamond uppercase font-bold text-lg md:text-xl tracking-widest text-left">
          Customer Information
        </h4>
      </div>
      <div className="flex border-b text-[#525252] py-4 mb-4">
        <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
          <strong>Customer Name:</strong>
        </div>
        <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
          {customer?.name}
        </div>
      </div>
      <div className="flex border-b text-[#525252] py-4 mb-4">
        <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
          <strong>Email:</strong>
        </div>
        <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
          {customer?.email}
        </div>
      </div>
      <div className="flex border-b text-[#525252] py-4 mb-4">
        <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
          <strong>Phone:</strong>
        </div>
        <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
          {customer?.phone}
        </div>
      </div>
      <div className="flex border-b text-[#525252] py-4 mb-4">
        <div className="w-1/2 font-eb-garamond text-left text-sm md:text-base">
          <strong>Address:</strong>
        </div>
        <div className="w-1/2 font-eb-garamond text-right text-sm md:text-base">
          {customer?.address}
        </div>
      </div>
    </div>
  );
}
