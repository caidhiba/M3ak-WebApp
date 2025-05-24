import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { therapistsData } from '../data/therapistsData';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import '../Styles/TherapistProfile.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import MyCalendar from '../Components/Calendar/Calendar';
const TherapistProfile = () => {
  const { id } = useParams();
  //const therapist = therapistsData.find(t => t.id === parseInt(id));
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [activeTab, setActiveTab] = useState('about');
  const [therapist, setTherapist] = useState(null);
  const {userinfo,user,isAuthenticated,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  const [loading, setLoading] = useState(true);
  const [avis, setAvis] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ note: 5, commentaire: '' });

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setVisibleReviews(prev => prev + 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Vérifie si l'id est valide
    if (!id) {
      console.error("ID invalide ou non défini");
      setLoading(false);
      return;
    }
    axios.get(`http://127.0.0.1:8000/api/GestionAccounts/therapist/${id}/`)
      .then(response => {
        console.log(response.data)
        setTherapist(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du livre :", error);
        setLoading(false);
      });

      axios.get(`http://127.0.0.1:8000/api/gestion-library/AvisList/${id}/`)
      .then(response => {
        console.log(response.data)
        setAvis(response.data.avis);
        setRating(response.data.moyenne);
        setReviewCount(response.data.nombre);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du livre :", error);
        setLoading(false);
      });

      axios.get(`http://127.0.0.1:8000/api/gestion-sessions/creneaux/${id}/`)
      .then(response => {
        console.log(response.data)       
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du livre :", error);
        setLoading(false);
      });

  }, [id]);

const handleSubmitAvis = () => {
  if (!newReview.commentaire || !newReview.note) return;

  const payload = {
    note: newReview.note,
    commentaire: newReview.commentaire,
  };
  console.log(payload)
  axios.post(`http://127.0.0.1:8000/api/gestion-library/CreateAvis/${id}/`, payload,{
    headers: {
        Authorization: `Bearer ${user?.access}` // si tu utilises JWT
      },
  })
    .then((response) => {
      alert("Avis envoyé !");
      setAvis(prev => [response.data.avis, ...prev]); // ajouter le nouvel avis localement
      setRating(response.data.moyenne);
      setReviewCount(response.data.nombre);
      setShowReviewForm(false);
      setNewReview({ note: 5, commentaire: '' });
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi de l'avis :",  error.response.data.detail);
      alert(error.response.data.detail);
    });
};
 const handleModifaitTime = (timestamp) =>{
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
        const year = String(date.getFullYear()).slice(2); // Derniers 2 chiffres de l'année
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year} à ${hours}:${minutes}`;
        return formattedDate;
}
if (loading) return <div>Chargement en cours...</div>;
if (!therapist) {

return (
      <>
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Therapist not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div id='TherapistProfile' className="profile-container">
        <div className="profile-main">
          
          <div className="left-column">
            <img src={therapist.user.photo} alt={therapist.user.last_name} className="profile-img" />

            <div className="pricing-section under-photo">
              <h3>Add To Cart</h3>
              <p>Book your session now</p>
              <p className="price"> {therapist.price || '1000'} DA</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}>
                    {i < Math.floor(rating) ? '★' : '☆'}
                  </span>
                ))}
                {<span>
                  ({rating.toFixed(1)}) • {reviewCount || 0} reviews
                </span>}
              </div>
            </div>

            <div className="includes-section inline">
              <h3>Includes:</h3>
              <ul>
                {therapist.includes?.map((item, index) => {
                  const parts = item.split(':');
                  return (
                    <li key={index}>
                      {parts[0]}
                      {parts[1] && <span className="highlight">: {parts[1]}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/****************************************************************************** */}
          <div className="middle-column">
            <div className="profile-info">
              <h1>{therapist.user.first_name} {therapist.user.last_name}</h1>
              
              <h2>{therapist.job || 'Licensed Therapist'}</h2>
              
              <p className="categories">
                {therapist.client_type || 'Uncategorized'}{/**?.join(' • ') */}
              </p>
            </div>

            <div className="about-section">
              <div className="tab-header">
                <button
                  className={activeTab === 'about' ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab('about')}
                >
                  About Me
                </button>
                <button
                  className={activeTab === 'details' ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={activeTab === 'languages' ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab('languages')}
                >
                  Languages
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'about' && (
                  <div className="details">
                    <strong>About Me</strong>
                    <p>{therapist.bio}</p>
                  </div>
                )}
                {activeTab === 'details' && (
                  <div className="details">
                    <strong>Details</strong>
                    <p>{therapist.details || 'No additional details provided.'}</p>
                    {therapist.specialites.length > 0 && (
                       <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <strong>Specializations :</strong>{' '}
                            {therapist.specialites.map((spec, idx) => (
                               <p key={idx}>
                                    {spec.nom}{idx < therapist.specialites - 1 ? ', ' : ''}
                                </p>                    
                             ))}
                       </p>                  
                    )}
                    <strong>Availability Argency:</strong>
                    <p>{therapist.disponibilite_urgence ? 'yes' :'no'}</p>
                    <strong>Etats:</strong>
                    <p>{therapist.etat ? 'Active' :'desactive'}</p>
                    <strong>Tarif Horair:</strong>
                    <p>{therapist.tarif_horaire}</p>
                  </div>
                )}
                {activeTab === 'languages' && (
                  <div className="details">
                    <strong>Languages</strong>
                    <p>{therapist.languages_spoken?.map(lan => lan.name).join(", ")|| 'Language information not available.'}</p>
                  </div>
                )}
                <button className="see-more">See more</button>
              </div>
            </div>

            <div className="calender_info">
                 <h2> My calendar</h2>
                 <MyCalendar id_thyrapist={id} />
            </div>

           {/********************************************************************************************** */}
            <div className={`reviews-section ${avis?.length > 4 ? 'scrollable-reviews' : ''}`}>
              <h3>Reviews and Rating</h3>
              {avis?.slice(0, visibleReviews).map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="review-header"> 
                       <img src={`http://127.0.0.1:8000${review.id_patient.user.photo}`} alt="Profile" className="profile-img" />
                       <div>
                           <strong>{review.id_patient.user.first_name} {review.id_patient.user.last_name}</strong>
                           <p>{handleModifaitTime (review.date_avis)}</p>
                       </div>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.note ? 'star-filled' : 'star-empty'}>
                           {i < review.note? '★' : '☆'}
                         </span>
                      ))}
                    </div>
                  </div>
                  
                  <p>{review.commentaire}</p>
                  <button className="read-more">Read More</button>
                </div>
              ))}
              {visibleReviews < avis?.length && (
                <p className="loading-text">Loading more reviews...</p>
              )}

              {/* !isLoading && isAuthenticated && (
                    <button className="btn-add-review" onClick={() => setShowReviewForm(true)}>
                            Donner un avis
                    </button>
                )*/}
                 <button className="btn-add-review" onClick={() => setShowReviewForm(true)}>
                            Add a review
                 </button>
            </div>
          </div>
        </div>
      </div>


      {showReviewForm && (
        <div className="review-form-modal">
          <div className="review-form-box">
            <button className="close-btn" onClick={() => setShowReviewForm(false)}>X</button>
            <h3>Laissez votre avis</h3>
            <label>Note (sur 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.note}
              onChange={(e) => setNewReview({ ...newReview, note: parseInt(e.target.value) })}
            />
            <label>Commentaire</label>
            <textarea
              rows="4"
              value={newReview.commentaire}
              onChange={(e) => setNewReview({ ...newReview, commentaire: e.target.value })}
            ></textarea>
            <button className="submit-btn" onClick={handleSubmitAvis}>
                 Envoyer l'avis
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </>

  );
};

export default TherapistProfile;
