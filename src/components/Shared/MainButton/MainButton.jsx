// eslint-disable-next-line no-unused-vars
import React from "react";
import "./MainButton.css";

// eslint-disable-next-line react/prop-types
export default function MainButton({ title, className, onClick }) {
return (
    <svg
    width="150"
    height="50"
    viewBox="0 0 150 50"
    xmlns="http://www.w3.org/2000/svg"
    className={`stroke-button ${className}`}  
    onClick={onClick}  
    style={{ cursor: "pointer" }}  
    >
    <rect
        x="5"
        y="5"
        width="140"
        height="40"
        fill="transparent"
        stroke="var(--stroke)"
        strokeWidth="1"
        strokeDasharray="330% 25"
        strokeDashoffset="240%"
    />
    <text
        x="75"
        y="26"
        fill="var(--button-text-color)"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="var(--button-text-font)"
        fontWeight="600"
        letterSpacing="0.07em"
        fontSize="13"
    >
        {title}
    </text>
    </svg>
);
}