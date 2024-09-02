// Orders.jsx
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../Redux/actions/orderAction";
import MainButton from "../component/MainButton";
import "../App.css";
import { Link } from "react-router-dom";
import Pagination from "../component/Pagination";
import SearchBar from "../component/searchBar/SearchBar";

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

 /////////////// Filter على orderNumber ////////////////////////////
  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
//////////////////////////////////////////////////////////

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="relative pb-[500px] sm:w-full">
      <div className="bg-white pb-[50px] md:w-[100%] lg:w-[100%] sm:w-[100%] w-[100%]">
        <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
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
              <div className="py-5">
                <SearchBar setSearchTerm={setSearchTerm} />
              </div>
              <div className="grid grid-cols-6 font-bold border-b text-xs sm:text-sm md:text-base lg:text-lg text-[#525252] py-3 text-center bg-gray-100">
                <div className="font-eb-garamond">Order Number</div>
                <div className="font-eb-garamond">Customer</div>
                <div className="font-eb-garamond">Delivery Status</div>
                <div className="font-eb-garamond">Shipping</div>
                <div className="font-eb-garamond">Total</div>
                <div className="font-eb-garamond"></div>
              </div>

              {currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="grid grid-cols-6 sm:grid-cols-6 border-b border-gray-200 py-4 sm:py-2 md:py-3 lg:py-4 items-center gap-4 md:gap-2 sm:gap-1 lg:gap-4 text-center"
                >
                  <div className="font-eb-garamond">{order.orderNumber}</div>
                  <div className="font-eb-garamond">
                    {order.customer ? order.customer.name : "Unknown Customer"}
                  </div>
                  <div className="font-eb-garamond">{order.orderStatus}</div>
                  <div className="font-eb-garamond">{50} $</div>
                  <div className="font-eb-garamond">{order.orderTotal} $</div>
                  <Link to={`/orders/${order._id}`}>
                    <div className="font-eb-garamond">
                      {<MainButton title={"View Single Order"} />}
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
      <Link to={"/"}>
        <div className="font-eb-garamond">
          {<MainButton title={"Back to Home"} />}
        </div>
      </Link>
    </div>
  );
}
