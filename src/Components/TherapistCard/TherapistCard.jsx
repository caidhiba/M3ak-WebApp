import React from "react";
import { Link } from "react-router-dom";
import "./TherapistCard.css";

export default function TherapistCard({ id, name, categories, description, image }) {
  return (
    <div className="card">
      <img src={image || "https://via.placeholder.com/300"} alt={name} className="card-img" />
      <div className="card-content">
        <span className="card-category">
          {categories && categories.length > 0 ? categories.join(", ") : "Uncategorized"}
        </span>
        <h3>{name}</h3>
        <p>{description}</p>
        <Link to={`/therapist/${id}`}>Read more →</Link>
      </div>
    </div>
  );
}
