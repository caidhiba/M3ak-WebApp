import React from "react";
import "./TherapistCard.css";

export default function TherapistCard({ name, categories, description, image }) {
  return (
    <div className="card">
      <img src={image || "https://via.placeholder.com/300"} alt={name} className="card-img" />
      <div className="card-content">
        <span className="card-category">
          {categories && categories.length > 0 ? categories.join(", ") : "Uncategorized"}
        </span>
        <h3>{name}</h3>
        <p>{description}</p>
        <a href="#">Read more →</a>
      </div>
    </div>
  );
}
