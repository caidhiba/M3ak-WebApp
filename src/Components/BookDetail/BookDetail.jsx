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
import book1 from "../../Assets/book1.png";
import book2 from "../../Assets/book2.png";
import book3 from "../../Assets/book3.png";
import book4 from "../../Assets/book4.png";
import authorImg from "../../Assets/author.png";

import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';

import "./BookDetail.css";
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const BookDetail = () => {
  const { id } = useParams();
  //const book = bookData[id];
  const [activeTab, setActiveTab] = useState("description");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const {userinfo,user,isAuthenticated,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'id est valide
    if (!id) {
      console.error("ID invalide ou non défini");
      setLoading(false);
      return;
    }
    axios.get(`http://127.0.0.1:8000/api/gestion-library/books/${id}/`)
      .then(response => {
        console.log(response.data)
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du livre :", error);
        setLoading(false);
      });
  }, [id]);


  const handleRecommend = () => {
     if (!user || !user.access) {
        alert("Vous devez être connecté pour recommander ce livre.");
        navigate('/login');   
       return;
     }
  
    axios.post(`http://127.0.0.1:8000/api/gestion-library/books/${book.id}/recommander/`,{},{
       headers: { Authorization: `Bearer ${user?.access}` }
    })
    .then(response => {
       alert(` Vous recommandez le livre : "${response.data}"`)
      console.log('Réponse du serveur:', response.data);
      //alert(`Merci ! Vous recommandez le livre : "${book.title}"`);
    })
    .catch(error => {
      if (error.response && error.response.data.detail) {
        alert(error.response.data.detail); // Erreur retournée du backend
      } else {
        alert(error.response)
      }
    });
 
  };
  const handlecommend = () => {
    if (!user || !user.access) {
      alert("Vous devez être connecté pour commander ce livre.");
      navigate('/login');
      return;
    }

    const quantityInput = document.querySelector('.quantity');
    const quantity = parseInt(quantityInput.value);

    if (!quantity || quantity <= 0) {
      alert("Veuillez entrer une quantité valide.");
      return;
    }
   axios.post(`http://127.0.0.1:8000/api/gestion-library/CommanderBook/${book.id}/`, {
      //book_id: book.id,
      quantity: quantity
    },
    {
      headers: {
        Authorization: `Bearer ${user.access}`
      }
    }
  ).then(response => {
    alert(response.data.detail)
    alert("Vous avez 2 jour maximeux pour payee  cette commend!")
    const idBook = response.data.idCommande//book.id;
    navigate('/payment', { state: { id:idBook , message:'Payee Commande Book'}});
  }).catch(error => {
    if (error.response) {
      console.error(error.response.data);
      alert(error.response.data.detail || "Erreur lors de la commande.");
    } else {
      alert("Erreur réseau.");
    }
  });
 }



   console.log(id);  // Vérifie la valeur de `id`
  if (loading) return <div>Chargement en cours...</div>;
  //if (!book) return <div>Book not found.</div>;
  //const displayedTherapists = showAll ? book.recommande_par : book.recommande_par.slice(0, 2);
  const displayedNames = showAll
  ? book.recommande_par.map(rec => `${rec.user.first_name} ${rec.user.last_name}`)
  : book.recommande_par.slice(0, 2).map(rec => `${rec.user.first_name} ${rec.user.last_name}`);

const fullListText = displayedNames.join(', ');
  return (
    <div className="book-detail-container">
    <div className="book-detail-content">
      {<img src={book.cover } alt="Book Cover" className="book-image" />}
      
      <div className="book-info">
        {/* <div className="breadcrumb">Shop all &gt; Category &gt; Product name</div> */}
  
        <h1 className="book-title">{book.title}</h1>
        <div className="info-container">
          <div className="price">{book.price}DA |</div>
           <div className='author'>{book.author}</div>
        </div>
        
        <div className="tabs">
          <span className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Description</span>
          <span className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</span>
        </div>
  
        <div className="tab-content">
          {activeTab === 'description' ? (
            <p>{book.description}</p>
          ) : (
            <div className='details'>
              {/*<p><strong>Publisher:</strong><br />
                 {book.description}
              </p> 
              <p><strong>Publication date:</strong><br />
                
              </p>*/}
              <p><strong>Language:</strong><br />
                 {book.language && book.language.length > 0
                  ? book.language.map(lan => lan.name).join(", ")
                 : "Uncategorized"}
                
              </p>
              <p><strong>Print length:</strong><br />
                {book.nmb_page} pages
              </p>
              <p><strong>Stock</strong><br />
                {book.stock}
              </p>
               <p><strong>Recommandé par :</strong><br /> {fullListText}
                  {book.recommande_par.length > 2 && (
                    <button
                      onClick={() => setShowAll(!showAll)}
                      style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                    >
                      {showAll ? 'Voir moins' : 'Voir plus >'}
                    </button>
                  )}
              </p>
              <p className="book-category"><strong>Category:</strong><br />
                {book.category && book.category.length > 0
                ? book.category.map(cat => cat.name).join(", ")
                 : "Uncategorized"}
              </p>
            </div>
          )}
        </div>
  
        {/* <div className="author-section">
          <strong>BY Tony Attwood</strong>
          <img src="author.jpg" className="author-img" alt="Author" />
        </div> */}
  
        <div className="action-buttons">
          {/*<button className="add-to-cart">Add To Cart</button>*/}
          <div className="buy-now-group">
            <button className="buy-now" onClick={handlecommend}>Buy Now</button>
            <input type="number" className="quantity" defaultValue="1"  max={book.stock}/>
          </div>
          {isLoading ? null : (  
            isAuthenticated && userinfo.role =='therapeute' ? (
            <>
            {/* ➕ Bouton recommander */}
              <button
                onClick={handleRecommend}
                className='Recommendbutton'
              >
                ⭐ Recommander ce livre
              </button>
              {/*<FaStar onClick={handleRecommend} style={{ color: 'gold', cursor: 'pointer', marginLeft: '10px' }} />*/}
            </>
            ) : null
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BookDetail;

/*const bookData = {
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
};*/