import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import BookCard from '../Components/BookCard/BookCard.jsx'
import FiltersBook from '../Components/filtersBook/FiltersBook.jsx'

const BookShop = () => {
  const [booksData, setBooksData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/gestion-library/books/')
      .then(response => {
        setBooksData(response.data);
        setFilteredBooks(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des thérapeutes :", error);
      });
  }, []);

  const handleFilterChange = (newFilters) => {
    const filtered = booksData.filter(book => {
      return (
        (!newFilters.language.length === 0 || 
            newFilters.language.some(lang => 
              book.language.some(l => l.name === lang)
            )) &&
        (!newFilters.author || book.author.toLowerCase().includes(newFilters.author.toLowerCase())) &&
        (!newFilters.stock || (newFilters.stock === 'in' ? book.stock > 0 : book.stock === 0)) &&
        (!newFilters.nmb_page || book.nmb_page >= parseInt(newFilters.nmb_page)) &&
        (!newFilters.price || book.price <= newFilters.price)
      );
    });
    setFilteredBooks(filtered);
    setIsFiltered(true);
  };

  const handleClearFilters = () => {
    setFilteredBooks(booksData);
  };

  return (
    <>
      <Header />
      <div className="part"></div>
      <div className="middle BookShop">
        <div className="left-menu">
          <FiltersBook onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
        </div>

        <div className="right-part">
          <div className="title">
            Our Book Collection:
            <div className="t2">
              Explore our carefully curated collection of books designed to help you on your journey of healing, self-discovery, and personal growth.
            </div>
          </div>

          <div className="search-sort">
            <div className="search-wrapper">
              <i className="fa fa-search search-icon" aria-hidden="true"></i>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            {/*isFiltered && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )*/}
            <select className="sort-dropdown">
              <option>Sort by</option>
              <option>Category</option>
              <option>Target Audience</option>
              <option>Language</option>
              <option>Purpose</option>
              <option>Price Range</option>
            </select>
          </div>

          <div className="cards books">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                name={book.title}
                category={book.categories}//"Mental Health"
                author={book.author}
                price={book.price}
                image={book.cover}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookShop;