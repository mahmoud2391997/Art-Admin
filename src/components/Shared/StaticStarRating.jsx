import React from "react";
import StarIcon from "../../assets/icons/starIcon";

export default function StaticStarRating({ rating }) {
    return (
    <div className="flex">
        {[...Array(5)].map((_, index) => (
        <span key={index}>
            <StarIcon filled={index < rating} />
        </span>
        ))}
    </div>
    );
}
