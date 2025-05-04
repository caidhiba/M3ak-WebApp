// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './BookDetail.css';

// export default function BookDetail() {
//   const { id } = useParams();
//   const [showComment, setShowComment] = useState(false);
//   const [comment, setComment] = useState("");

//   // Fake data for demo
//   const book = {
//     id,
//     name: "The Autistic Survival Guide To Therapy",
//     author: "Tony Attwood",
//     price: "2000DA",
//     description:
//       "This is a helpful guide for autistic individuals navigating therapy sessions.",
//     image: "/book-cover.png",
//   };

//   return (
//     <div className="book-detail">
//       <img src={book.image} alt={book.name} className="book-detail-img" />
//       <div className="book-detail-content">
//         <h1>{book.name}</h1>
//         <p><strong>Price:</strong> {book.price}</p>
//         <p><strong>Author:</strong> {book.author}</p>
//         <p>{book.description}</p>

//         <button onClick={() => setShowComment(!showComment)} className="detail-btn">
//           {showComment ? "Hide Details" : "Details"}
//         </button>

//         {showComment && (
//           <div className="comment-section">
//             <textarea
//               placeholder="Write your comment..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></textarea>
//             <button className="submit-comment">Submit</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useParams } from 'react-router-dom';
// import book1 from "../../Assets/book1.png";
// import book2 from "../../Assets/book2.png";
// import book3 from "../../Assets/book3.png";
// import book4 from "../../Assets/book4.png";
//  import authorImg from '../../Assets/author.png'; // Example author avatar
// import "./BookDetail.css";
// import React, { useState } from 'react';


// Static mock database
// const bookData = {
//   1: {
//     name: "The Autistic Survival Guide To Therapy",
//     author: "Dr. Steph Jones",
//     category: "Mental Health",
//     price: 2000,
//     image: book3,
//     description: "A helpful guide for autistic individuals navigating therapy."
//   },
//   2: {
//     name: "Choosing Therapy",
//     author: "Dr. Ilyana Romoanovsky",
//     category: "Psychology",
//     price: 1500,
//     image: book4,
//     description: "An insightful look at how to choose the right therapy."
//   },
//   3: {
//     name: "Change your life in 30 days",
//     author: "Dr. Joseph Murphy",
//     category: "Personal Development",
//     price: 900,
//     image: book1,
//     description: "Practical steps to transform your life in one month."
//   },
//   4: {
//     name: "The Power of Your Subconscious Mind",
//     author: "Dr. Joseph Murphy",
//     category: "Spiritual Growth",
//     price: 1800,
//     image: book2,
//     description: "Harness the power of your subconscious to manifest change."
//   }
// };

// export default function BookDetail() {
//   const { id } = useParams();
//   const book = bookData[id];

//   if (!book) return <h2>Book not found.</h2>;

//   return (
//     <div className="book-detail">
//       <img src={book.image} alt={book.name} style={{ maxWidth: '250px', marginBottom: '20px' }} />
//       <h1>{book.name}</h1>
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Category:</strong> {book.category}</p>
//       <p><strong>Price:</strong> {book.price} DA</p>
//       <p><strong>Description:</strong> {book.description}</p>

//       <details style={{ marginTop: '20px' }}>
//         <summary>Leave a comment</summary>
//         <textarea placeholder="Write your comment here..." rows="5" style={{ width: "100%", marginTop: "10px" }}></textarea>
//       </details>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import book1 from "../../Assets/book1.png";
import book2 from "../../Assets/book2.png";
import book3 from "../../Assets/book3.png";
import book4 from "../../Assets/book4.png";
import authorImg from "../../Assets/author.png";
import "./BookDetail.css";

const bookData = {
  1: {
    name: "The Autistic Survival Guide To Therapy",
    author: "Tony Attwood",
    category: "Mental Health",
    price: 2000,
    image: book3,
    description: "BY Tony Attwood",
    details: `· Publisher : One More Chapter (March 27, 2025)
              · Publication date : March 27, 2025
              · Language : English
              · Print length : 353 pages
              · Recommender par : dr.Steve C, Wissam Shaath .. ect
              · Stock : 12`
  },
  2: {
    name: "Choosing Therapy",
    author: "Dr. Ilyana Romoanovsky",
    category: "Psychology",
    price: 1500,
    image: book4,
    description: "BY Dr. Ilyana Romoanovsky",
    details: "· Publisher: Therapy House\n· Language: English\n· Pages: 210\n· Recommender: Dr. J. Hassan\n· Stock: 5"
  },
  3: {
    name: "Change your life in 30 days",
    author: "Dr. Joseph Murphy",
    category: "Personal Development",
    price: 900,
    image: book1,
    description: "BY Dr. Joseph Murphy",
    details: "· Publisher: Mindset Press\n· Language: English\n· Pages: 320\n· Recommender: Dr. L. Smith\n· Stock: 8"
  },
  4: {
    name: "The Power of Your Subconscious Mind",
    author: "Dr. Joseph Murphy",
    category: "Spiritual Growth",
    price: 1800,
    image: book2,
    description: "BY Dr. Joseph Murphy",
    details: "· Publisher: Penguin\n· Language: English\n· Pages: 365\n· Recommender: Prof. Amir N.\n· Stock: 10"
  }
};

const BookDetail = () => {
  const { id } = useParams();
  const book = bookData[id];
  const [activeTab, setActiveTab] = useState("description");

  if (!book) return <div>Book not found.</div>;

  return (
    <div className="book-detail-container">
    <div className="book-detail-content">
      <img src={book.image} alt="Book Cover" className="book-image" />
      
      <div className="book-info">
        {/* <div className="breadcrumb">Shop all &gt; Category &gt; Product name</div> */}
  
        <h1 className="book-title">The Autistic Survival Guide To Therapy</h1>
        <div className="info-container">
        <div className="price">2000DA |</div>
        <div className='author'>{book.author}</div>
        </div>
        
        <div className="tabs">
          <span className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</span>
          <span className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</span>
        </div>
  
        <div className="tab-content">
          {activeTab === 'description' ? (
            <p>Lorem ipsum dolor sit amet...</p>
          ) : (
            <div className='details'>
              · Publisher: One More Chapter (March 27, 2025)<br />
              · Publication date: March 27, 2025<br />
              · Language: English<br />
              · Print length: 353 pages<br />
              · Recommender par: dr.Steve C, Wissam Shaath, etc.<br />
              · Stock: 12
            </div>
          )}
        </div>
  
        {/* <div className="author-section">
          <strong>BY Tony Attwood</strong>
          <img src="author.jpg" className="author-img" alt="Author" />
        </div> */}
  
        <div className="action-buttons">
          <button className="add-to-cart">Add To Cart</button>
          <div className="buy-now-group">
            <button className="buy-now">Buy Now</button>
            <input type="number" className="quantity" defaultValue="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BookDetail;

