import { useState } from 'react';
import '../styles/Orders.css';

export default function Commandes() {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4;
  
    const books = [  
      {
        id: 1,
        title: "Change your life in 30 days",
        price: "900DA",
        orderDate: "05/20/2025",
        quantity: 2
      },
      {
        id: 2,
        title: "The power of your Subconscious Mind",
        price: "900DA",
        orderDate: "05/18/2025",
        quantity: 1
      },
      {
        id: 3,
        title: "The autistic survival guide to Therapy",
        price: "2000DA",
        orderDate: "05/15/2025",
        quantity: 3
      },
      {
        id: 4,
        title: "Choosing Therapy",
        price: "1500DA",
        orderDate: "05/10/2025",
        quantity: 1
      },
    ];
  
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);
    
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  
    return (
      <div className="commandes-container">
        <div className="commandes-header">
          <div>
            <h1>Orders</h1>
            <p>Manage your book orders.</p>
          </div>
          <div className="action-buttons">
            <button className="outline-btn">Add</button>
            <button className="solid-btn">Order</button>
            <button className="more-btn">⋯</button>
          </div>
        </div>
  
        <div className="commandes-table">
          <div className="commandes-table-header">
            <div className="column title-column">Title</div>
            <div className="column price-column">Price</div>
            <div className="column date-column">Order Date</div>
            <div className="column quantity-column">Quantity</div>
            <div className="column actions-column"></div>
          </div>
  
          {currentBooks.map(book => (
            <div className="commande-row" key={book.id}>
              <div className="column title-column">
                <div className="book-info">
                  <div className="book-cover"></div>
                  <div className="book-details">
                    <div className="book-title">{book.title}</div>
                  </div>
                </div>
              </div>
              <div className="column price-column">{book.price}</div>
              <div className="column date-column">{book.orderDate}</div>
              <div className="column quantity-column">{book.quantity}</div>
              <div className="column actions-column">
                <button className="view-btn">View</button>
              </div>
            </div>
          ))}
        </div>
  
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              className="pagination-btn" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    );
}