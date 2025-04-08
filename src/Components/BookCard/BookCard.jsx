import React from "react";
import "./BookCard.css";

export default function BookCard({ name, category, author, price, image }) {
  return (
    <div className="book-card">
      <img src={image || "https://via.placeholder.com/150"} alt={name} className="book-imgg" />
      <div className="book-content">
        <h3 className="book-title">{name}</h3>
        <p className="book-author">by {author}</p>
        <p className="book-category">{category || "Uncategorized"}</p>
        <p className="book-price">{price ? `${price}DA` : "Price not available"}</p>
        <button className="view-btn">View</button>
      </div>
    </div>
  );
}
