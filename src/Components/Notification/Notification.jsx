
import React, { useEffect, useState,useRef } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import "./NotificationBell.css"; // Import du fichier CSS pour le style
const NotificationBell = () => {
    const [notifications, setNotifications] = useState([
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
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const socketRef = useRef(null); // Référence au WebSocket

    // Charger les notifications via WebSocket (en temps réel)
    const fetchNotifications = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/GestionNotifications/notifications-list/");  // ✅ URL relative pour éviter les problèmes
            setNotifications(response.data.notifications || []);
            console.log("Notifications récupérées :", response.data.notifications);
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
        }
    };
    
    useEffect(() => {
        //fetchNotifications();  // Récupérer les notifications au montage
        
        // Détecte HTTP ou HTTPS pour définir le bon protocole WS/WSS
        /*const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
        const socketUrl = `${wsProtocol}://${window.location.host}/ws/notifications/`;

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
        };*/
    }, []);


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
                  <li key={notification.id} className="notification-item">
                    <a
                      href={`/room/${notification.related_room.id}`}
                      className="notification-link"
                    >
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-time">{notification.timestamp}</p>
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      

    );
};

export default NotificationBell;
