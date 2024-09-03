/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../Redux/actions/orderAction";
import MainButton from "../components/MainButton";
import "../App.css";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchBar from "../components/searchBar/SearchBar";
import { BiArrowBack } from "react-icons/bi";

export default function Orders() {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.orders);
  const { loading, orders, error } = ordersState;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ordersPerPage = 4;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  /////////////// Filter على orderNumber ////////////////////////////
  const lowerCaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";
  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber &&
      order.orderNumber.toLowerCase().includes(lowerCaseSearchTerm)
  );

  //////////////////////////////////////////////////////////

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="relative  sm:w-full h-screen">
      <div className="p-4 sm:p-6 md:p-10  mx-[10px] bg-white rounded-lg shadow-lg w-full h-full">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : loading ? (
          <div className="w-full h-[20vh] flex flex-col items-center justify-center">
            <div className="w-[75%] h-[40%] flex items-center justify-center m-auto border-2 border-gray-500">
              <h1 className="md:text-xl text-lg text-center">
                Loading orders...
              </h1>
            </div>
          </div>
        ) : (
          <div>
            <Link to={"/"}>
              <div className="font-eb-garamond ml-2">
                {<BiArrowBack className="text-[#c9ab81] text-2xl " />}
              </div>
            </Link>
            <div className="py-5 flex justify-between items-center">
              <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 font-bold border-b text-xs sm:text-sm md:text-base lg:text-lg text-[#525252] py-3 text-center bg-gray-100">
              <div className="font-eb-garamond">Order Number</div>
              <div className="font-eb-garamond">Customer</div>
              <div className="font-eb-garamond hidden md:block">
                Delivery Status
              </div>
              <div className="font-eb-garamond hidden md:block">Shipping</div>
              <div className="font-eb-garamond hidden md:block">Total</div>
              <div className="font-eb-garamond"></div>
            </div>

            {currentOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-6 border-b border-gray-200 py-4 sm:py-2 md:py-3 lg:py-4 items-center gap-4 md:gap-2 sm:gap-1 lg:gap-4 text-center"
              >
                <div className="font-eb-garamond">{order.orderNumber}</div>
                <div className="font-eb-garamond">
                  {order.customer ? order.customer.name : "Unknown Customer"}
                </div>
                <div className="flex items-center justify-center md:flex">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-500"
                        : order.orderStatus === "Shipping"
                        ? "bg-yellow-500"
                        : order.orderStatus === "Pending"
                        ? "bg-blue-500"
                        : order.orderStatus === "Cancel"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></span>
                  <span className="text-sm font-medium">
                    {order.orderStatus}
                  </span>
                </div>
                <div className="font-eb-garamond hidden md:block">{50} $</div>
                <div className="font-eb-garamond hidden md:block">
                  {order.orderTotal} $
                </div>
                <Link to={`/orders/${order._id}`}>
                  <div className="font-eb-garamond sm:w-20">
                    {<MainButton title={"View "} />}
                  </div>
                </Link>
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
