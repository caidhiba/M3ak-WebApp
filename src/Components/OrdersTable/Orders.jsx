import { useEffect, useState,useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import './Orders.css';
import { useNavigate } from 'react-router-dom';
export default function Commandes() {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4;
    const navigate = useNavigate();
    
    const [books, setBooks] = useState([]);
    const {userinfo,updateUserInfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);
    useEffect(() => {
      if (!isLoading && user) {
         fetchOrders();
      }
    }, [isLoading, user]);
    
    const fetchOrders = () => {
       axios.get('http://127.0.0.1:8000/api/gestion-library/orders/', {
       headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {
      setBooks(res.data)
      console.log(res.data)
    }).catch(error => {
      if (error.response && error.response.data.detail) {
        alert(error.response.data.detail); // Erreur retournée du backend
      } else {
        alert(error.response)
      }
    })//.catch(console.error);
  };
    const goToPayee=(id) => {
        navigate('/payment', { state: { id:id , message:'Payee Commande Book'}});
    };
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
            {/*<div className="column quantity-column">Quantity</div>*/}
            <div className="column actions-column">Status</div>
          </div>
  
          {currentBooks.map(book => (
            <div className="commande-row" key={book.id}>
              <div className="column title-column">
                <div className="book-info">
                  {/*<div className="book-cover">
                     <img src={`http://127.0.0.1:8000${book.list_books[0].cover}`} alt="Profile" />
                  </div>*/} 
                  <div className="book-details">
                    <div className="book-title ">{book.list_books[0].title}</div>
                  </div>
                </div>
              </div>
              <div className="column price-column">{book.list_books[0].price}</div>
              <div className="column date-column">{book.date_commande}</div>
              {/*<div className="column quantity-column">{book.quantity}</div>*/}
              
              <div className="column actions-column">
                {book.is_paye === false ? ( 
                  <button onClick={() => goToPayee(book.id)} className="view-btn">payee</button>
                  ):(
                    <>
                     {book.is_paye}
                    </>
                  )} 
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


/*const books = [  
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
    ];*/