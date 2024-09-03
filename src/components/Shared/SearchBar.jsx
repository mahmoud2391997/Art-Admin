import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setSearchTerm,placeholder }) {
    const [input, setInput] = useState("");

    const handleChange = (value) => {
    setInput(value);
    setSearchTerm(value);
    };

    return (
    <div className="w-[50%] h-10 rounded-lg px-4  bg-gray-100 flex items-center">
        <FaSearch className="text-[#c9ab81] " />
        <input
        className="bg-transparent text-[#383838] border-none h-full text-lg w-full ml-1.5 focus:outline-none"
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        />
    </div>
    );
}