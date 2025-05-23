import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect,useContext } from 'react';
import MiniCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './Calendar.css'
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
const locales = {
  fr: fr
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar({id_thyrapist}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Ajouter un état loading
  const {userinfo,user,isAuthenticated,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSlot, setNewSlot] = useState({ date: '', time: '' });
  const navigate = useNavigate();
  // Fetch creneaux depuis Django
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/gestion-sessions/creneaux/${id_thyrapist}/`)
      .then(response => {
        console.log(response.data)  
        const formatted = response.data.map(ev => ({
          ...ev,
          start: new Date(ev.start),
          end: new Date(ev.end),
          disponibilite: ev.disponibilite,
          id:ev.id
      }));
      setEvents(formatted);     
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du livre :", error);
        setLoading(false);
      });
    }, []);
  // Ajout de coloration
const eventStyleGetter = (event) => {
  const backgroundColor = event.disponibilite ? '#4CAF50' : '#F44336';
  return {
    style: {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    }
  };
};

  const handleMiniCalendarClick = (selectedDate) => {
    setDate(selectedDate);
    setView('day'); // Changer vue principale vers "Jour"
  };
  const handleOnSelectEvent =(e) =>{
    if (isLoading || !user || !userinfo || !isAuthenticated ){ return ;}
    if(userinfo.role === 'therapeute') {
        // il peux annuler ou modifait si il est disponble 
        setSelectedSession(e);
    }else if(userinfo.role === 'patient'){
        // Afficher le détail de la session
        if(e.start < new Date() ){
          return;
        }
        setSelectedSession(e);
    }
  }
  const handleReserve = (session) => {
    // Exemple simple : appel API ou affichage d'un message
      if (session.end < new Date()) {
        alert('La ceaneux est déjà terminée !');
      }else{
          console.log("Réservation du créneau :", session);
          axios.post(`http://127.0.0.1:8000/api/gestion-sessions/CreateSessions/${session.id}/`,{},{
              headers: {
                  Authorization: `Bearer ${user?.access}` // si tu utilises JWT
               },
          })
          .then(response => {
                console.log(response.data)  
              
                 // Mettre à jour l'état du créneau réservé
                 const updatedEvents = events.map(ev => {
                    if (ev.id === session.id) {
                       return { ...ev, disponibilite: false };  // Mettre à jour la disponibilité
                    }
                    return ev;
                 });

                 setEvents(updatedEvents);
                 setSelectedSession(null); // Ferme la boîte après réservation  
                 navigate('/payment', { state: { id:session.id , message:'Payee Resarvation Session'}});
           })
           .catch(error => {
               //console.error("Erreur lors de la récupération du livre :", error);
               if (error.response && error.response.data.detail) {
                 alert(error.response.data.detail); // Erreur retournée du backend
              } else {
                 alert(error.response);
                 setLoading(false);
              }               
            });         
      }  
  };
  /*const handleOnSelectSlot = (e) =>{
    if ( !user || !userinfo || !isAuthenticated ||userinfo.role === 'patient' ){ return ;}
    if(userinfo.role === 'therapeute') {
      // create new session
    }
  }*/
  const handleCreateSlot = () => {
  const start = new Date(`${newSlot.date}T${newSlot.time}`);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // +1h

  axios.post(`http://127.0.0.1:8000/api/gestion-sessions/CreateCreneaux/`, {
    //start: start.toISOString(),
    //end: end.toISOString(),
    //disponibilite: true,
    //therapist: userinfo.id // ou `user.id` selon ton backend
    jour: newSlot.date,
    heure_debut: newSlot.time, 
  }, {
    headers: {
      Authorization: `Bearer ${user?.access}`,
    }
  })
  .then(response => {
    setEvents([...events, {
      ...response.data,
      start: start,//new Date(response.data.start),
      end: end,//new Date(response.data.end),
      disponibilite: true,
      id:response.data.id,
      titre:`${userinfo.first_name} ${userinfo.last_name}`,//f`${response.data.therapeute.user.first_name} ${response.data.therapeute.user.last_name}`,
    }]);
    setShowAddForm(false);
    setNewSlot({ date: '', time: '' });
  })
  .catch(error => {
    alert(error.response.data.error);
    console.error(error);
  });
};
 const handleDeleteSlot = (event) =>{
  const id = event.id;
  axios.delete(`http://127.0.0.1:8000/api/gestion-sessions/DelatCreneaux/${id}/`,{
    headers: {
      Authorization: `Bearer ${user?.access}`,
    }
  }).then(()=>{
    // Supprimer localement le créneau de la liste
    const updatedEvents = events.filter(ev => ev.id !== id);
    
    setEvents(updatedEvents);
    setSelectedSession(null); // Fermer la boîte de détails
    alert(" Créneau supprimé avec succès");
  })
  .catch(error =>{
    console.error(error)
    alert(error.response.data.error);
    });
 }



  return (
    <div style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      {/* Mini calendrier visible uniquement si la vue actuelle est "agenda" */}
       {userinfo?.role === 'therapeute' && (
              <button className="submit-btn add-session-btn" onClick={() => setShowAddForm(true)} >
                  Ajouter un créneau
              </button>
        )}
      {view === 'agenda' && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 999,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <MiniCalendar
            locale="fr-FR"
            onClickDay={handleMiniCalendarClick}
            value={date}
          />
        </div>
      )}

      {/* Grand calendrier toujours visible */}
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        view={view}
        onView={(newView) => setView(newView)}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        eventPropGetter={eventStyleGetter}
        selectable
        style={{ height: '100%' }}
        //onSelectSlot={handleOnSelectSlot}
        onSelectEvent={handleOnSelectEvent}
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          noEventsInRange: "Aucun événement dans cette période.",
        }}
      />


      {selectedSession && (
        <div className="session-info-box review-form-modal">
          <div className="box-content review-form-box">
             <button className="close-button close-btn" onClick={() => setSelectedSession(null)}>✖</button>
              <h3> Session's Details </h3>
              <p><strong>Title :</strong> {selectedSession.title}</p>
              <p><strong>Start :</strong> {selectedSession.start.toLocaleString()}</p>
              <p><strong>End :</strong> {selectedSession.end.toLocaleString()}</p>
              <p><strong>Disponibilite : </strong>{selectedSession.disponibilite ? 'Yes' :'NO'}</p>
              {selectedSession.disponibilite && (
                userinfo?.role === 'therapeute' ? (
                  <button
                     className="submit-btn Delate-button"
                     onClick={() => handleDeleteSlot(selectedSession)} // Attention: fonction à créer
                  >
                    Delate Session
                 </button>
               ) : (
                 <button
                    className="submit-btn reserve-button"
                    onClick={() => handleReserve(selectedSession)}
                  >
                    Reserve Session
                 </button>
               )           
             )}
          </div>
         </div>
        )}
       {showAddForm && (
             <div className="session-info-box review-form-modal">
               <div className="box-content review-form-box">
                  <button className="close-button close-btn" onClick={() => setShowAddForm(false)}>✖</button>
                  <h3>Ajouter un créneau</h3>
                  <label>
                     Jour :
                      <input type="date" value={newSlot.date} onChange={e => setNewSlot({...newSlot, date: e.target.value})} min={new Date().toISOString().split('T')[0]} />
                  </label>
                  <label>
                     Heure de début :
                       <input type="time" value={newSlot.time} onChange={e => setNewSlot({...newSlot, time: e.target.value})} />
                  </label>
                  <button className="submit-btn" onClick={handleCreateSlot}>Créer le créneau</button>
                </div>
              </div>
         )}

    </div>
  );
}

export default MyCalendar;



