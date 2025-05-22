import React, { useEffect, useState, useRef,useContext } from 'react';
import axios from 'axios';
import ChatWindow from '../Components/ChatRoom/ChatRoom';  // Import du composant ChatWindow
import InputChat from '../Components/ChatRoom/Inputchat';    // Import du composant InputChat
import {FaVideo } from 'react-icons/fa';
//import CreateVideoCall from './CreateVideoCall';
import ContactList from '../Components/ChatRoom/ContactList'; // Import du composant ContactList
import '../Styles/ChatApp.css'; // Import du fichier CSS pour le style


import { AuthContext } from '../auth/AuthContext';
const ChatApp = () => {
    const [MessagesEtAppels, setMessagesEtAppels] = useState([]);// Liste triée de messages + appels vidéo
    const [listusers, setListUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const chatSocket = useRef(null);
    
    // 🗒️ le user contient le token de l'utilisateur connecté 
    // 🗒️ le userinfo contient les informations de l'utilisateur connecté (first_name,last_name,role,user_id)
    const {userinfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    
    const [conversation, setConversation] = useState(null); // contient la session active 
    const [isExpired, setIsExpired] = useState(false);
    const [finSession, setFinSession] = useState(null);
    
    // Connexion WebSocket au serveur
    
    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/GestionCommunication/conversation/', {
              headers: {
                Authorization: `Bearer ${user?.access}`,
              },
            }); 
            console.log('Données reçues:', response.data);  // Vérifier les données reçues
            //setRooms(response.data.rooms);
            setListUsers(response.data)
            //setPersonCurrent(response.data.person_current);
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
        }
    };
    
    
    useEffect(() => {   
       if (!isLoading && user) {
        fetchRooms();
      }
    },[isLoading, user]);
    
    
    
    const handleUserClick = async (AutreUser) => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/GestionCommunication/conversation/${AutreUser.id}/messages/`, {
            headers: {
              Authorization: `Bearer ${user?.access}`,
            },
          });
          console.log('Room details response:', response.data); // Debugging
          const { session, items } = response.data;
          console.log( response.data);
          console.log( "session est:",session)
          /*console.log(items)*/
          setConversation(session);
          setMessagesEtAppels(items);
          setSelectedUser(AutreUser);
          //const [hours, minutes, seconds] = session.heure_debut.split(':');
          /*const fin = new Date(session.heure_debut.getTime() + 60 * 60 * 1000); // +1h
          setFinSession(fin);*/
          const [hours, minutes, seconds] = session.heure_debut.split(':');
          const datePart = session.jour; // "2025-05-21"
          const fullDatetimeString = `${datePart}T${hours}:${minutes}:${seconds}`;
          const heureDebut = new Date(fullDatetimeString);

          // Ajouter 1 heure
          const fin = new Date(heureDebut.getTime() + 60 * 60 * 1000);
          setFinSession(fin);
          console.log('la fin de sesion est 😒',fin)
          //console.log('la sesion est time 😒',hours, minutes, seconds)
          
      } catch (error) {
          console.error('Error fetching room details:', error);
      }
    };
  useEffect(() => {
    if (!finSession) return;
    if (!isExpired) {
       // Calculer la date/heure de fin : date_creation + heure_debut + 1h     
       const checkExpiration = () => {
         const now = new Date();
         setIsExpired(now > finSession);    //console.log('la sesion est 😒 à ',isExpired);    
      };
       checkExpiration(); // Test immédiat    
       const intervalId = setInterval(checkExpiration, 30 * 1000); // toutes les 30 secondes
       console.log('la sesion est 😒 à ',isExpired)
       return () => clearInterval(intervalId);
    }else{
      console.log('La session est expirée.😒');
      try {
         const response = axios.post(`http://127.0.0.1:8000/api/gestion-sessions/FinSessions/${conversation.id}/`,{}, {
            headers: {
              Authorization: `Bearer ${user?.access}`,
            },
         });
         // ✅ Si la requête a réussi, on recharge la page
        if (response.status === 200 && conversation.statut != 'terminee') {
            alert("✅ Session marquée comme terminée.");
           window.location.reload(); // 👈 Recharge toute la page
        }
      } catch (error) {
          console.error('❌ Erreur lors de la fermeture de la session :', error);
      }

    }
   }, [isExpired,finSession]);
    /************************************************************ */
    useEffect(() => {
      const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
      if (!conversation || !conversation.id || isExpired ) return;
      if (!user || !user?.access) return;
      const socket = new WebSocket(`http://127.0.0.1:8000/ws/chat/${conversation.id}/?token=${user?.access}`); // Remplacez par votre URL de WebSocket
      chatSocket.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connecté');
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('Message reçu:', data);
            // Traitez le message reçu ici
            if (data.action === "delete_message") {
              setMessagesEtAppels((prevMessages) => 
               prevMessages.filter(msg => msg.id !== data.message_id)
             );
           }else if(data.action === "update_message"){
                 setMessagesEtAppels((prevMessages) =>
                           prevMessages.map(msg => 
                             msg.id === data.message_id ? { ...msg, message: data.new_content } : msg
                           )
                         );
           }else if (data.type === 'chat_message') {//create_message
                
                setMessagesEtAppels(prevMessages => [
                    ...prevMessages,
                    {
                        id: data.id_msg,
                        message: data.message,  // le contenu du message peux être un texte, un fichier, etc.
                        sendeur: data.sendeur, // le id de l'utilisateur qui a envoyé le message
                        type_objet: data.type, // 'message' ou chat_message
                        type: data.type_msg, // 'text', 'audio', 'file'
                        date_envoi:data.date_envoi
                    }
                ]);
           } else if (data.type === 'call_invitation') {// 'create_call'
                setMessagesEtAppels(prevMessages => [
                    ...prevMessages,
                    {
                        id: data.id_call,
                        //content: data.message,  // le contenu du message peux être un texte, un fichier, etc.
                        sender: data.sender, // le id de l'utilisateur qui a envoyé le message
                        type_objet: data.type, // 'call_invitation'
                        //type: data.type_msg, // 'text', 'audio', 'file'
                        heure_debut: data.start_time,
                        statut: data.status,
                      }
                ]);
            }
        };

        socket.onclose = (event) => {
            console.log("🔴 WebSocket fermé:", event);
        };

        return () => {
            socket.close();
        };
    }, [conversation]); // Ajout de selectedRoom comme dépendance pour se reconnecter à la bonne room

  /******************************************************************************************** */
  const handleSubmitMessage = (messageToSend) => {
         // on envoiyer le message de type texte  au serveur via le socket 
    if( !finSession || isExpired) {
            alert("Votre session payée avec cette personne est terminée. Merci.");
            return;
    }else{
         if (chatSocket.current) {
            // messageToSend est un objet contenant le message et d'autres informations
            console.log("Connexion établie, envoi du message:", messageToSend);
            chatSocket.current.send(JSON.stringify(messageToSend));
          
          console.log('Message envoyé:', messageToSend);
        } else {
          console.log('WebSocket non connecté');
        }
      }
  };

  
  /********************************************************************************************* */
    // Fonction pour gérer le changement de message
     // Placeholder functions for "Delete" and "Pin" actions
const handleDelete = async (messageId) => { 
  if( !finSession || isExpired) {
            alert("Votre session payée avec cette personne est terminée. Merci.");
            return;
  }else{
    if (chatSocket.current) {
       chatSocket.current.send(JSON.stringify({
         type: 'message',
         action: "delete_message",
         message_id: messageId
       }));
    } else {
        console.log('WebSocket non connecté');
     }
  }
}


  
const handleEdit = async (messageId) => {
  if( !finSession || isExpired) {
       alert("Votre session payée avec cette personne est terminée. Merci.");
      return;
  }else{ 
   if (chatSocket.current) {  
     console.log('message est :',messageId)
     const newText = prompt("Modifier le message :");
       if (newText) {
        chatSocket.current.send(JSON.stringify({
           type: 'message',
           action: "update_message",
           message_id: messageId,
           new_content: newText
         }));
       }
    } else {
        console.log('WebSocket non connecté');        
    }
  }
};
     
    // Fonction pour afficher la vidéo
const handleCreateCall = () => {
      // Notifier l'autre utilisateur via WebSocket
    if( !finSession || isExpired) {
            alert("Votre session payée avec cette personne est terminée. Merci.");
            return;
    }else{
      if (chatSocket.current) {    
        chatSocket.current.send(JSON.stringify({
          type: 'video_call',
          //sender: user.id,
          start_time: new Date().toISOString(),
         })
        );
       } else {
        console.log('WebSocket non connecté');
          
       }
    }  //setIsVideoCallVisible(true);
  };
  /****************************************************************************** */
  
  return (
        <div className="ChatApp">
           
                 
          {/* Left Side - 40% */}
            <div className="LeftSide ">{/** est fait dans le css  */}
                <h1 className='Titre'>Contacts</h1>
                <hr></hr>
                <ContactList listusers={listusers} onSelectUser={handleUserClick} />{/** Affiche la liste des contacts */}
            </div>
          {/* Right Side - 60% */}
          {selectedUser ? (
            <div className="RightSide ">{/** est fait dans le css  */}
                {/* Header (sticky en haut) */}
                <div className="HeaderRightSide  ">                       
                         <div >
                          {/** selectedUser.photo */}
                           <img src={`http://127.0.0.1:8000${selectedUser.user.photo}`}  alt="User" className={`w-8 h-8 rounded-full`}></img>           
                           <h1 className='Titre'>{selectedUser.user.first_name} {selectedUser.user.last_name}</h1>
                         </div> 
                         {console.log("userinfo:", userinfo) }
                      { userinfo.role ==="therapeute" &&  (
                         <div>
                              <button
                                onClick={handleCreateCall}
                                disabled={loading}
                              >
                                <FaVideo size={24}  className='iconChat'/>
                              </button>
                        
                              {/* Le composant CreateVideoCall qui s'affiche de façon absolue */}
                              {/*isVideoCallVisible && (
                                <div className="BoxCreateVideoCall">
                                  
                                  <CreateVideoCall roomId={conversation.id} onClose={handleCloseCall} />
                                </div>
                              )*/}
                         </div>
                      )}
                </div>
                  
                {/* Chat Window */}
                
                <ChatWindow selectedUser={selectedUser.user} MessagesEtAppels={MessagesEtAppels} handleEdit={handleEdit} handleDelete={handleDelete} />

                 {/* Input Chat */}
                 <InputChat handleSubmitMessage={handleSubmitMessage} />
            </div>
          ) : (
            <div className="RightSide ">
                <p className="text-gray-500">Sélectionnez un contact pour afficher la discussion.</p>
            </div>         
          )} 
            
              
        </div>
    );
};

export default ChatApp;
