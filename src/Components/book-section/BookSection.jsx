import React from "react";
import "./BookSection.css";

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
  return (
    <section className="books-section">
      <h2>Our Books</h2>
      <p>These are the books we offer for sale:</p>
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
      <button className="view-all">View All</button>
    </section>
  );
};

export default BooksSection;