/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";

export default function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState("");

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value) => setSearchTerm(value), 500),
    [setSearchTerm]
  );

  const handleChange = (value) => {
    setInput(value);
    debouncedSetSearchTerm(value);
  };

  return (
    <div className="w-[50%] h-10 rounded-lg px-4 bg-gray-100 flex items-center">
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
