import './Appointments.css';
import { useEffect, useState,useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import { Link } from 'react-router-dom'; // assure-toi que c'est importé
import { useNavigate } from 'react-router-dom';
export default function Appointments() {
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 6;
    const {userinfo,updateUserInfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    const [appointments, setAppointments] = useState([]);
   
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
    const navigate = useNavigate();
    useEffect(() => {
       if (!isLoading && user) {
          fetchAppointments();
       }
    }, [isLoading, user]);
    
    
    const fetchAppointments = () => {
    axios.get('http://127.0.0.1:8000/api/gestion-sessions/Sessions/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {setAppointments(res.data); console.log(res.data);
    }).catch(error => {
      if (error.response && error.response.data.detail) {
        alert(error.response.data.detail); // Erreur retournée du backend
      } else {
        alert(error.response)
      }
    })
    console.log(appointments)
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
            <h1>⏰ Appointments</h1>
            <p>View and manage your upcoming appointments.</p>
          </div>
          <div className="action-buttons">
            <button className="outline-btn">New</button>
            <button className="solid-btn">Schedule</button>
            <button className="more-btn">⋯</button>
          </div>
        </div>
  
        <div className="appointments-table">
          <div className="appointments-table-header">
            {userinfo.role === "therapeute" ? (
               <div className="column name-column">Patient</div>
            ):(<div className="column name-column">Therapeute</div>)}
            <div className="column date-column">Date</div>
            <div className="column time-column">Time</div>
            <div className="column actions-column">Prix</div>
            <div className="column actions-column">Status</div>
          </div>
  
          {currentAppointments.map(appointment => (
            <div className="appointment-row" key={appointment.id}>
              <div className="column name-column">
                <div className="user-info">
                  
                  {userinfo.role === "therapeute" ? (
                    <>
                           <div >{/**className="user-avatar" */}
                           {/*<span className="avatar-placeholder">👤</span>*/}
                                 <img className='profile-img '  src={`http://127.0.0.1:8000${appointment.patient.user.photo}`} alt="Profile" />
                            </div>
                           <div>
                             <div className="user-name">{appointment.patient.user.first_name} {appointment.patient.user.last_name}</div>
                             <div className="user-email">{appointment.patient.user.sexe}</div>
                           </div>
                    </>
                   ):(
                    <>
                          <div >{/** className="user-avatar"*/}
                           {/*<span className="avatar-placeholder">👤</span>*/}
                             <Link to={`/therapist/${appointment.creneau.therapeute.id}`}>
                                 <img className='profile-img '  src={`http://127.0.0.1:8000${appointment.creneau.therapeute.user.photo}`} alt="Profile" />
                             </Link>
                          </div>
                         <div>
                          <div className="user-name">{appointment.creneau.therapeute.user.first_name} {appointment.creneau.therapeute.user.last_name}</div>
                          <div className="user-email">{appointment.creneau.therapeute.user.sexe}</div>
                        </div>
                    </>
                   )}                 
                </div>

              </div>
              <div className="column date-column">{appointment.creneau.jour}</div>
              <div className="column time-column">{appointment.creneau.heure_debut}</div>
              <div className="column time-column">{appointment.prix}</div>
              <div className="column actions-column">
                {userinfo.role === 'patient'&& appointment.statut === 'reservee' ? ( 
                  <button className="view-btn" onClick={()=>{ navigate('/payment', { state: { id:appointment.id , message:'Payee Resarvation Session'}});}}>payee</button>
                  ):(
                    <>
                     {appointment.statut}
                    </>
                  )} 
              </div>

            </div>
          ))}
        </div>
  
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
      </div>
    );
}



 /* const appointments = [
      
        { id: 1, fullName: 'Wissam Shaath', email: 'wissam@example.com', date: '05/22/2025', time: '2:00 PM' },
        { id: 2, fullName: 'Dr. Marwa Azab', email: 'marwa@example.com', date: '05/23/2025', time: '10:30 AM' },
        { id: 3, fullName: 'Dr. Sophie Cheval', email: 'sophie@example.com', date: '05/24/2025', time: '3:45 PM' },
        { id: 4, fullName: 'Dr. Hatim Alzahim', email: 'hatim@example.com', date: '05/25/2025', time: '9:15 AM' }
    ];*/
  
    