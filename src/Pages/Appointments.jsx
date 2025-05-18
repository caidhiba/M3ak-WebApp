import { useState } from 'react';
import '../styles/Appointments.css';

export default function Appointments() {
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 6;
  
    
    const appointments = [
      
        { id: 1, fullName: 'Wissam Shaath', email: 'wissam@example.com', date: '05/22/2025', time: '2:00 PM' },
        { id: 2, fullName: 'Dr. Marwa Azab', email: 'marwa@example.com', date: '05/23/2025', time: '10:30 AM' },
        { id: 3, fullName: 'Dr. Sophie Cheval', email: 'sophie@example.com', date: '05/24/2025', time: '3:45 PM' },
        { id: 4, fullName: 'Dr. Hatim Alzahim', email: 'hatim@example.com', date: '05/25/2025', time: '9:15 AM' }
    ];
  
    
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
    
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
            <h1>Appointments</h1>
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
            <div className="column name-column">Name</div>
            <div className="column date-column">Date</div>
            <div className="column time-column">Time</div>
            <div className="column actions-column"></div>
          </div>
  
          {currentAppointments.map(appointment => (
            <div className="appointment-row" key={appointment.id}>
              <div className="column name-column">
                <div className="user-info">
                  <div className="user-avatar">
                    <span className="avatar-placeholder">👤</span>
                  </div>
                  <div>
                    <div className="user-name">{appointment.fullName}</div>
                    <div className="user-email">{appointment.email}</div>
                  </div>
                </div>
              </div>
              <div className="column date-column">{appointment.date}</div>
              <div className="column time-column">{appointment.time}</div>
              <div className="column actions-column">
                <button className="view-btn">View</button>
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