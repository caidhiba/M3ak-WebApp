import AudioMessage from './AudioMessage';
import FileUpload from './FileUpload';
import Message from './Message';
import React, { useEffect, useState, useRef,useContext } from 'react';
import { FiTrash2, FiEdit3,FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import MessageOptions from './OptionsMessageAction'; // adapte le chemin selon ton dossier
const ChatWindow = ({selectedUser,MessagesEtAppels ,handleDelete,handleEdit}) => {

    const [playingIndex, setPlayingIndex] = useState(null);
    const [SelectedMessageId, setSelectedMessageId] = useState(null);//pour delate ou modifait le message 
    const messagesEndRef = useRef(null);//pour scroll automatiquement vers le bas
    const navigate = useNavigate();
    const {userinfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    // Scroll to bottom when a new message is added
    useEffect(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [MessagesEtAppels]);

    const goToVideoCall=(idCall) => {
        navigate('/VideoCall', { state: { idCall,selectedUser }});
    };
    // Toggle visibility of options box
  const handleMoreClick = (messageId) => {
    //setSelectedMessageId(SelectedMessageId === messageId ? null : messageId);  // Toggle visibility for the clicked message's options
    setSelectedMessageId((prev) => (prev === messageId ? null : messageId));
  };
  
  const handleModifaitTime = (timestamp,msg) =>{
        if (!timestamp) return "";
        if( msg === 'chat_message'){
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          return `Aujourd'hui à ${hours}:${minutes}`;
        } 
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
      <div className="ChatWindowRightSide">                   
          <div className="messages">       
            {MessagesEtAppels.map((msg, index) => (
                   
               msg.type_objet === 'videocall'|| msg.type_objet === 'call_invitation'?  ( 
                  <div className="video_call">
                    <div>  
                        {/*<p>
                          <i className="fa-solid fa-phone"></i>
                          <strong>{msg.caller}</strong> started a call
                        </p>*/}
                        <p><small>Start Time: {handleModifaitTime(msg.heure_debut)}</small></p>
                        {msg.statut ==='terminé' ? (
                          <p><small>End Time: {handleModifaitTime(msg.heure_fin)}</small></p>
                        ) : (
                          <p>Status: {msg.statut}</p>
                        )}
                        {/* button to join the call */}
                        {msg.statut ==='en cours' && (
                          <button onClick={() => goToVideoCall(msg.id)} className="ButtonClick">Join Call</button>
                        )}
                    </div>
                  </div>
                ):(
                 <div key={index} className={`BoxMessage ${msg.sendeur && msg.sendeur.id === userinfo.user_id  ? 'current-user' : 'other-user'}`}>{/**  */}
                     {/* User image */}
                     {msg.type_objet === 'chat_message' || msg.type_objet === 'message' ? (
                     <div className={msg.sendeur.id === userinfo.user_id ? 'order-last' : 'order-first'}>{/**  */}
                            <img src={msg.sendeur.photo ?  `http://127.0.0.1:8000${msg.sendeur.photo}` :"https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg"}  alt="User" className={`w-8 h-8 rounded-full`}></img>
                     </div>
                     ) : null}
                     
                    {/* Message content */}
                    <div className={`${msg.sendeur && msg.sendeur.id === userinfo.user_id   ? 'MessageCourantUser' : 'MessageAutreUser'}`}>{/** ${msg.sendeur.id === userinfo.id  ? 'MessageCourantUser' : 'MessageAutreUser'}*/}
                     {msg.type_objet === 'message'|| msg.type_objet === 'chat_message'  ? (//  msg.type === 'chat_message'  pour le chat temp real et autre quand recuper les messages
                      <div>
                        {/* Message content based on type_msg */}
                          {msg.type === 'text' ? (
                          <Message
                            timestamp={handleModifaitTime(msg.date_envoi,msg.type_objet)}
                            content={msg.message}
                            //isCurrentUser={msg.sendeur === personCurrent}
                          />
                           ) : msg.type === 'audio' ? (
                          
                              <AudioMessage 
                                  key={index}
                                  audioUrl={msg.message}
                                  index={index}
                                  playingIndex={playingIndex}
                                  setPlayingIndex={setPlayingIndex}
                              />
                          
                           ) : msg.type === 'file' ? (
                         
                              <FileUpload selectedFile={msg.message || msg.file_url} />
                                        
                           ) : null}
                      </div>
                     ) : null}                       
                    </div>
                      {/* Options box (conditionally rendered) absolute right-0 top-0*/}
                      {msg.type_objet === 'chat_message' || msg.type_objet === 'message' ? (
                           <div className={msg.sendeur.id === userinfo.user_id  ? 'order-first' : 'haden'}>{/**className={msg.sendeur.id === userinfo.id ? 'order-first' : 'order-last'} */}
                             <FiMoreHorizontal
                                onClick={() => handleMoreClick(msg.id)}
                                className="cursor-pointer"
                              />
                              {SelectedMessageId === msg.id && (
                              <MessageOptions
                                messageId={msg.id}
                                handleDelete={handleDelete}
                                handlePin={handleEdit} // Pin redirigé vers Edit
                                isActive={SelectedMessageId === msg.id}
                              />
                              )}
                          </div>
                        ) : null}
                    {/* Auto scroll to latest message */}
                          <div ref={messagesEndRef} />
                    {/*</div>*/}
                  </div>)
            ))}{/** fin de boocle */}
          </div>
      </div>
  );
};

export default ChatWindow;


/**
 * 
 * 
 * "items": [
    {
      "id": 14,
      "conversation": { "id": 5, "is_open": true },
      "sendeur": { "id": 4, "first_name": "Sami", "last_name": "Ali", "photo": "/media/sami.jpg" },
      "message": "Salut !",
      "date_envoi": "2025-05-02T09:00:00Z",
      "statut": false,
      "type": "text",
      "timestamp": "2025-05-02T09:00:00Z",
      "type_objet": "message",
    },
    {
      "id": 32,
      "conversation": { "id": 5, "is_open": true },
      "heure_debut": "2025-05-02T10:00:00Z",
      "heure_fin": "2025-05-02T10:30:00Z",
      "duree": 30,
      "statut": "terminé",
      "timestamp": "2025-05-02T10:00:00Z",
      "type_objet": "videocall",
    }
  ]

 */