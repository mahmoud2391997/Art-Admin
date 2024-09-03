// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../Redux/actions/orderAction";
import OrdersTotals from "./OrdersTotals";
import CustomerInformation from "./CustomerInformation";
import ProductsTable from "./ProductsTable";
import { BiArrowBack } from "react-icons/bi";

export default function SingleOrder() {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://art-ecommerce-server.glitch.me/admin/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA",
        },
      })
      .then((response) => {
        setOrderItems(response.data);
        setSelectedStatus(response.data.orderStatus);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setError("Failed to fetch order data");
      });
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    dispatch(updateOrderStatus(id, { status: newStatus }));
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!orderItems) {
    return (
      <div className="w-full h-[20vh] flex flex-col items-center justify-center">
        <div className="w-[75%] h-[40%] flex items-center justify-center m-auto border-2 border-gray-500">
          <h1 className="md:text-xl text-lg text-center">Loading orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 ">
      <Link to="/orders" className="mt-4 inline-block">
        <BiArrowBack className="text-[#c9ab81] text-2xl sm:text-3xl md:text-4xl" />
      </Link>
      <h1 className="font-eb-garamond text-[#525252] uppercase font-bold text-lg md:text-2xl tracking-widest text-left mt-4">
        Order Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* قسم التفاصيل اليسار */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <p className="border-b-2 p-1 ml-0 md:ml-4 text-sm font-bold text-[#c9ab81]">
              <strong className="font-eb-garamond text-[#525252] text-lg md:text-xl">
                Order Date:
              </strong>{" "}
              {new Date(orderItems.orderDate).toLocaleDateString()}
            </p>
            <p className="mt-2 md:mt-0">
              <strong className="font-eb-garamond text-[#525252] text-lg md:text-xl">
                Status:
              </strong>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="border-b-2 p-1 ml-0 md:ml-4 text-sm font-bold text-[#c9ab81] mt-2 md:mt-0"
              >
                <option value="Processing">Processing</option>
                <option value="Shipping">Shipping</option>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancel">Cancel</option>
              </select>
            </p>
          </div>

          <ProductsTable orderItems={orderItems} />

          <OrdersTotals orderItems={orderItems} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <CustomerInformation customer={orderItems.customer} />
        </div>
      </div>
    </div>
  );
}
