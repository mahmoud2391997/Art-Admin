/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";


export default function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    setSearchTerm(value);
  };

  return (
    <div className="w-[50%] h-10 rounded-lg px-4  bg-gray-100 flex items-center">
      <FaSearch className="text-[#c9ab81] justify-end flex" />
      <input
        className="bg-transparent font-eb-garamond text-[#383838] border-none h-full text-lg w-full ml-1.5 focus:outline-none"
        placeholder="search by order number..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
