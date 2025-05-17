// import React from "react";
// import "./BookCard.css";
// import { useNavigate } from "react-router-dom";
// export default function BookCard({ name, category, author, price, image }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/book/${id}`);
//   };
//   return (
//     <div className="book-card" onClick={handleClick}>
//       <img src={image || "https://via.placeholder.com/150"} alt={name} className="book-imgg" />
//       <div className="book-content">
//         <h3 className="book-title">{name}</h3>
//         <p className="book-author">by {author}</p>
//         <p className="book-category">{category || "Uncategorized"}</p>
//         <p className="book-price">{price ? `${price}DA` : "Price not available"}</p>
//         <button className="view-btn">View</button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";
{/*image ? `http://127.0.0.1:8000/${image}` :  image*/} 
export default function BookCard({ id, name, category, author, price, image }) {
  return (
    <div className="book-card">
      <img 
        src={image}
        alt={name} 
        className="book-imgg" 
      />
      <div className="book-content">
        <h3 className="book-title">{name}</h3>
        <p className="book-author">by {author}</p>
        <p className="book-category">{category || "Uncategorized"}</p>
        <p className="book-price">{price ? `${price}DA` : "Price not available"}</p>
        
        {/* Only the button is clickable */}
        <Link to={`/book/${id}`}>
          <button className="view-btn">View</button>
        </Link>
      </div>
    </div>
  );
}
