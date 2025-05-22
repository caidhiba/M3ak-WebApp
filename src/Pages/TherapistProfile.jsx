import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { therapistsData } from '../data/therapistsData';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import '../Styles/TherapistProfile.css';

const TherapistProfile = () => {
  const { id } = useParams();
  const therapist = therapistsData.find(t => t.id === parseInt(id));
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [activeTab, setActiveTab] = useState('about');

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
      <div className="profile-container">
        <div className="profile-main">
          
          <div className="left-column">
            <img src={therapist.image} alt={therapist.name} className="profile-img" />

            <div className="pricing-section under-photo">
              <h3>Add To Cart</h3>
              <p>Book your session now</p>
              <p className="price"> {therapist.price} DA</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(therapist.rating) ? 'star-filled' : 'star-empty'}>
                    {i < Math.floor(therapist.rating) ? '★' : '☆'}
                  </span>
                ))}
                <span>
                  ({therapist.rating.toFixed(1)}) • {therapist.reviews?.length || 0} reviews
                </span>
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

          
          <div className="middle-column">
            <div className="profile-info">
              <h1>{therapist.name}</h1>
              <h2>{therapist.job || 'Licensed Therapist'}</h2>
              <p className="categories">
                {therapist.categories?.join(' • ') || 'Uncategorized'}
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
                    <p>{therapist.description}</p>
                  </div>
                )}
                {activeTab === 'details' && (
                  <div className="details">
                    <strong>Details</strong>
                    <p>{therapist.details || 'No additional details provided.'}</p>
                  </div>
                )}
                {activeTab === 'languages' && (
                  <div className="details">
                    <strong>Languages</strong>
                    <p>{therapist.languages?.join(', ') || 'Language information not available.'}</p>
                  </div>
                )}
                <button className="see-more">See more</button>
              </div>
            </div>

            <div className={`reviews-section ${therapist.reviews?.length > 4 ? 'scrollable-reviews' : ''}`}>
              <h3>Reviews and Rating</h3>
              {therapist.reviews?.slice(0, visibleReviews).map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <strong>{review.user}</strong>
                    <span> - {new Date().toLocaleDateString('en-US')}</span>
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>
                        {i < review.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <button className="read-more">Read More</button>
                </div>
              ))}
              {visibleReviews < therapist.reviews?.length && (
                <p className="loading-text">Loading more reviews...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TherapistProfile;
