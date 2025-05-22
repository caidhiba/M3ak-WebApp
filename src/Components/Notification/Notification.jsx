
import React, { useEffect, useState,useRef,useContext } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import "./NotificationBell.css"; // Import du fichier CSS pour le style
import { AuthContext } from '../../auth/AuthContext';
const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const socketRef = useRef(null); // Référence au WebSocket
    const {userinfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    // Charger les notifications via WebSocket (en temps réel)
    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/GestionNotifications/notifications-list/", {
            headers: {
              Authorization: `Bearer ${user?.access}`,
            },
          });  // ✅ URL relative pour éviter les problèmes
            setNotifications(response.data || []);
            console.log("Notifications récupérées :", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
        }
    };
    
    useEffect(() => {
        fetchNotifications();  // Récupérer les notifications au montage
        if (!user || user?.access) return;
        // Détecte HTTP ou HTTPS pour définir le bon protocole WS/WSS
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
        //const socketUrl = `${wsProtocol}://${window.location.host}/ws/notifications/`;
        const socketUrl = `http://127.0.0.1:8000/ws/notifications/?token=${user?.access}`;
        console.log("Connecting to WebSocket:", socketUrl); // Vérifier l'URL WebSocket
        
        socketRef.current = new WebSocket(socketUrl);

        socketRef.current.onopen = (event) => {
            console.log("WebSocket connected");
            console.log("Message reçu :", event.data);
        };

        socketRef.current.onmessage = (event) => {
            console.log("Message reçu :", event.data); // Log pour voir ce qui arrive
            try {
                const notificationData = JSON.parse(event.data);
                setNotifications((prevNotifications) => [notificationData, ...prevNotifications]);
            } catch (error) {
                console.error("Erreur de parsing JSON :", error);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current.onclose = (event) => {
            console.warn("WebSocket closed:", event);
        };
       // 🔄 Rafraîchir les notifications toutes les 10 secondes
        //const interval = setInterval(fetchNotifications, 10000);
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log("WebSocket fermé proprement");
            }
        };
    }, []);
    const handleModifaitTime = (timestamp) =>{
       /* if (!timestamp) return "";
        if( msg === 'chat_message'){
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          return `Aujourd'hui à ${hours}:${minutes}`;
        } */
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
        const year = String(date.getFullYear()).slice(2); // Derniers 2 chiffres de l'année
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year} à ${hours}:${minutes}`;
        return formattedDate;
  }

    return (
        <div className="notification-bell">
        <button onClick={() => setIsOpen(!isOpen)} className="notification-button">
          <div className="bell-wrapper">
            <FiBell className="icon-notification-bell" />
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </div>
          <FiChevronDown className={`icon-chevron ${isOpen ? "open" : ""}`} />
        </button>
      
        {isOpen && (
          <div className="notification-dropdown">
            <ul className="notification-list">
              {notifications.length === 0 ? (
                <li className="notification-empty">Aucune notification</li>
              ) : (
                
                notifications.map((notification) => (
                 notification.type =='send_notification'?(
                 <li key={notification.id_Sendeur} className="notification-item">
                    {console.log(notification)}
                      <a
                         href={`/room/${notification.session}`}
                         className="notification-link"
                      >
                      <p className="notification-message">{notification.NameSendeur}</p>
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-time">{handleModifaitTime(notification.created_at)}</p>
                    </a>
                  </li>
               ):(
                  <li key={notification.id_Sendeur} className="notification-item">
                    {console.log(notification)}
                      <a
                         href={`/room/${notification.session}`}
                         className="notification-link"
                      >
                      <p className="notification-message">{notification.message.sendeur.first_name} {notification.message.sendeur.last_name}</p>
                      <p className="notification-message">{notification.message.message}</p>
                      <p className="notification-time">{handleModifaitTime(notification.message.date_envoi)}</p>
                    </a>
                  </li>
               )
              ))
              )}
            </ul>
          </div>
        )}
      </div>
      

    );
};

export default NotificationBell;
/**
 {
        id: 1,
        message: "Nouvelle réponse dans le salon Général",
        timestamp: "2025-05-02 10:15:23",
        related_room: {
          id: 12,
          name: "Général",
        }
      },
      {
        id: 2,
        message: "Nouvelle notification dans le salon Aide",
        timestamp: "2025-05-02 11:00:00",
        related_room: {
          id: 13,
          name: "Aide",
        }
      }
 */