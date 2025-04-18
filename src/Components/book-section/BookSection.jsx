

// ____________________________________________________________________________________________

import React, { useState } from "react";
import "./BookSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const books = [
  {
    img: "/src/assets/book1.png",
    title: "Change your life in 30 days",
    price: "900DA",
  },
  {
    img: "/src/assets/book1.png",
    title: "The power of your Subconscious Mind",
    price: "900DA",
  },
  {
    img: "/src/assets/book3.png",
    title: "The autistic survival guide to Therapy",
    price: "2000DA",
  },
  {
    img: "/src/assets/book4.png",
    title: "Choosing Therapy",
    price: "1500DA",
  },
];

const BooksSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevBook = () => {
    setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
  };

  const nextBook = () => {
    setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
  };

  return (
    
    <section className="books-section">
  <h2>Our Books</h2>
  <p>These are the books we offer for sale:</p>

  {/* Desktop layout */}
  <div className="books-container">
    {books.map((book, index) => (
      <div className="book-card" key={index}>
        <img src={book.img} alt={book.title} />
        <div className="book-info">
          <h3>{book.title}</h3>
          <span className="price">{book.price}</span>
        </div>
        <button className="add-to-cart">Add to cart</button>
      </div>
    ))}
  </div>

  {/* Mobile carousel layout */}
  <div className="slider-container">
    <div className="arrow left" onClick={prevBook}>
      <FaChevronLeft />
    </div>
    <div className="arrow right" onClick={nextBook}>
      <FaChevronRight />
    </div>
    <div className="slider">
      {books.map((book, index) => (
        <div
          key={index}
          className={`book-card ${
            index === currentIndex ? "active" : "hidden"
          }`}
        >
          <img src={book.img} alt={book.title} />
          <div className="book-info">
            <h3>{book.title}</h3>
            <span className="price">{book.price}</span>
          </div>
          <button className="add-to-cart">Add to cart</button>
        </div>
      ))}
    </div>
  </div>

  <button className="view-all">View All</button>
</section>

  );
};

export default BooksSection;

