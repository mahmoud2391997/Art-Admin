// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../Redux/actions/orderAction";
import MainButton from "../component/MainButton";

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
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyNTI2OTE4NywiZXhwIjoxNzI1NTI4Mzg3fQ.AM-MKmkofBTOucmj-9ImCaSATnH0eBWwrgSdCuh_fzA'
        }
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

  const calculateTotalQuantity = () => {
    if (!orderItems || !orderItems.orderItems) return 0;
    return orderItems.orderItems.reduce((total, item) => total + item.productQuantity, 0);
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!orderItems) {
    return <div className="text-center">Loading order details...</div>;
  }

  return (
    <>
      
      <div className="ml-[200px] p-4 sm:p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <p>
                <strong>Order Date:</strong> {new Date(orderItems.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="border rounded p-2 ml-4"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </p>
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">Products</h2>

            {orderItems.orderItems && orderItems.orderItems.length > 0 ? (
              <>
                <div className="border-[1px]">
                  <div className="grid grid-cols-4 font-eb-garamond font-bold border-b text-xs sm:text-sm md:text-base lg:text-lg text-[#525252] py-3 text-center bg-gray-100">
                    <div>Product Name</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                  </div>
                  {orderItems.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-4 border-b border-gray-200 py-4 items-center text-center"
                    >
                      <div>{item.productName}</div>
                      <div>{item.productPrice} $</div>
                      <div>{item.productQuantity}</div>
                      <div>{item.productSubtotal || item.productPrice * item.productQuantity} $</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No products found for this order.</p>
            )}
          </div>

          {/* Right column for customer info and total quantity */}
          <div className="bg-gray-100 p-4 border rounded">
            <p>
              <strong>Customer Name:</strong> {orderItems.customer?.name}
            </p>
            <p>
              <strong>Order Number:</strong> {orderItems.orderNumber}
            </p>
            <p>
              <strong>Shipping:</strong> {50} $
            </p>
            <p>
              <strong>Total:</strong> {orderItems.orderTotal} $
            </p>
            <div className="mt-4">
              <strong>Total Products Ordered: </strong> {calculateTotalQuantity()}
            </div>
          </div>
        </div>

        <Link to="/orders" className="mt-4 inline-block">
          <MainButton title={"Back to Orders"} />
        </Link>
      </div>
    </>
  );
}
