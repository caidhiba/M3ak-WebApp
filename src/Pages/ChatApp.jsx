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
    
    
    // Connexion WebSocket au serveur
    
    const fetchRooms = async () => {
        try {
            console.log('user:', user); // Log the form data
            const response = await axios.get('http://127.0.0.1:8000/api/GestionCommunication/conversation/', /*{
              headers: {
                Authorization: `Bearer ${user?.access}`,
              },
            }*/); 
            console.log('Données reçues:', response.data);  // Vérifier les données reçues
            //setRooms(response.data.rooms);
            setListUsers(response.data)
            //setPersonCurrent(response.data.person_current);
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
        }
    };
    
    
    useEffect(() => {
       //fetchRooms();

       //if (!isLoading && user) {
        fetchRooms();
      //}
    },[isLoading, user]);
    
    
    
    const handleUserClick = async (user) => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/GestionCommunication/conversation/${user.id}/messages/`, /*{
            headers: {
              Authorization: `Bearer ${user?.access}`,
            },
          }*/);
          console.log('Room details response:', response.data); // Debugging
          const { session, items } = response.data;
          console.log( response.data);
          console.log( session)
          console.log(items)
          setConversation(session);
          setMessagesEtAppels(items);
          setSelectedUser(user);
          //setSelectedRoom(roomId);

          //setCombinedTimeline(response.data.combined_timeline);
      } catch (error) {
          console.error('Error fetching room details:', error);
      }
    };
    useEffect(() => {
      const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";

      console.log(conversation)
      if (!conversation || !conversation.id) return; // Empêche l'exécution si conversation est null
      const socket = new WebSocket(`http://127.0.0.1:8000/ws/chat/${conversation.id}/`); // Remplacez par votre URL de WebSocket
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
                             msg.id === data.message_id ? { ...msg, content: data.new_content } : msg
                           )
                         );
           }else if (data.type === 'chat_message') {//create_message
                setMessagesEtAppels(prevMessages => [
                    ...prevMessages,
                    {
                        id: data.id_msg,
                        content: data.message,  // le contenu du message peux être un texte, un fichier, etc.
                        sender: data.sender, // le id de l'utilisateur qui a envoyé le message
                        type_objet: data.type, // 'message' ou chat_message
                        type: data.type_msg, // 'text', 'audio', 'file'
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
                        start_time: data.start_time,
                        status: data.status,
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

    const handleSubmitMessage = (messageToSend) => {
         // on envoiyer le message de type texte  au serveur via le socket 
        if (chatSocket.current) {
            // messageToSend est un objet contenant le message et d'autres informations
            console.log("Connexion établie, envoi du message:", messageToSend);
            chatSocket.current.send(JSON.stringify(messageToSend));
          
          console.log('Message envoyé:', messageToSend);
        } else {
          console.log('WebSocket non connecté');
        }
      };

  

    // Fonction pour gérer le changement de message
     // Placeholder functions for "Delete" and "Pin" actions
   const handleDelete = async (messageId) => { 
    chatSocket.send(JSON.stringify({
      type: 'message',
      action: "delete_message",
      message_id: messageId
    }));
   }


  
  const handleEdit = async (messageId) => {
 
   const newText = prompt("Modifier le message :");
       if (newText) {
        chatSocket.send(JSON.stringify({
           type: 'message',
           action: "update_message",
           message_id: messageId,
           new_content: newText
         }));
       }
  };
     
    // Fonction pour afficher la vidéo
    const handleCreateCall = () => {

        // Notifier l'autre utilisateur via WebSocket
        
        chatSocket.send(JSON.stringify({
          type: 'call',
          //sender: user.id,
          start_time: new Date().toISOString(),
         })
      );
        //setIsVideoCallVisible(true);
      };
    
      // Fonction pour fermer la vidéo
      const handleCloseCall = () => {
        //setIsVideoCallVisible(false);
      };

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
                            {console.log(selectedUser)}
                           <img src={`http://127.0.0.1:8000/${selectedUser.photo}`}  alt="User" className={`w-8 h-8 rounded-full`}></img>           
                           <h1 className='Titre'>{selectedUser.first_name} {selectedUser.last_name}</h1>
                         </div> 

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
                   </div>

                {/* Chat Window */}
                {console.log('les messages',MessagesEtAppels)}
                <ChatWindow MessagesEtAppels={MessagesEtAppels} handleEdit={handleEdit} handleDelete={handleDelete} />

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
