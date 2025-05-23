//import '../AppointmentsTable/Appointments.css';
import { useEffect, useState,useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
export default function Recommendations() {
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 6;
    
    const {userinfo,updateUserInfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    
    const [booksRecommended, setBooksRecommended] = useState([]);
    const [recommendationsDetails, setRecommendationsDetails] = useState([]);
   
    /*const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
    */
    useEffect(() => {
      if (!isLoading && user) {
         fetchRecommendations();
      }
    }, [isLoading, user]);
    
    
  // 📥 Récupère les recommandations
  const fetchRecommendations = () => {
    axios.get('http://127.0.0.1:8000/api/gestion-library/recommendations/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {
      setBooksRecommended(res.data.books_recommended || []);
      setRecommendationsDetails(res.data.recommendations_details || []);
      console.log("Books:", res.data.books_recommended);
      console.log("Recs:", res.data.recommendations_details);
    }).catch(console.error);
  };
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className="appointments-container">
        <div className="appointments-header">
          <div>
            <h1>📚 My Recommendations</h1>
            <p>View and manage your upcoming recommendations.</p>
          </div>
          <div className="action-buttons">
            <button className="outline-btn">New</button>
            <button className="solid-btn">Schedule</button>
            <button className="more-btn">⋯</button>
          </div>
        </div>
  
        <div className="appointments-table">
          <div className="appointments-table-header">
            <div className="column name-column">Titre</div>
            <div className="column date-column">Author</div>
            <div className="column time-column">Date Recommendation</div>
            <div className="column actions-column">Date Pub Livre</div>
            <div className="column actions-column">Raison De Recommendation</div>
            <div className="column actions-column">Status</div>
          </div>
  
          {recommendationsDetails.map(recom => (
            <div className="appointment-row" >
              <div className="column name-column">
                <div className="user-info">        
                   <div className="user-name">{recom.title}</div>                         
                </div>

              </div>
              <div className="column time-column">{recom.author}</div>
              <div className="column date-column">{recom.date_recommendation}</div>
              <div className="column time-column">{recom.date_pub_livre}</div>
              <div className="column time-column"><p>{recom.raison_de_recommendation}</p></div>
              <div className="column actions-column"><p>{recom.status}</p></div>
            </div>
          ))}
        </div>
  
      {/*  <div className="pagination">
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
        </div>   */}   
      </div>
    );
}



 /* const appointments = [
      
        { id: 1, fullName: 'Wissam Shaath', email: 'wissam@example.com', date: '05/22/2025', time: '2:00 PM' },
        { id: 2, fullName: 'Dr. Marwa Azab', email: 'marwa@example.com', date: '05/23/2025', time: '10:30 AM' },
        { id: 3, fullName: 'Dr. Sophie Cheval', email: 'sophie@example.com', date: '05/24/2025', time: '3:45 PM' },
        { id: 4, fullName: 'Dr. Hatim Alzahim', email: 'hatim@example.com', date: '05/25/2025', time: '9:15 AM' }
    ];*/
  
    