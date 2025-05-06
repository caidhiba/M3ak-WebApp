import AudioMessage from './AudioMessage';
import FileUpload from './FileUpload';
import Message from './Message';
import React, { useEffect, useState,useRef } from 'react';
import { FiTrash2, FiEdit3,FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const ChatWindow = ({ MessagesEtAppels ,handleDelete,handleEdit}) => {

    const [playingIndex, setPlayingIndex] = useState(null);
    const [SelectedMessageId, setSelectedMessageId] = useState(false);//pour delate ou modifait le message 
    const messagesEndRef = useRef(null);//pour scroll automatiquement vers le bas
    const navigate = useNavigate();
    // Scroll to bottom when a new message is added
    useEffect(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [MessagesEtAppels]);

    const goToVideoCall=(idCall) => {
        navigate('/VideoCall', { state: { idCall } });
    };
    // Toggle visibility of options box
  const handleMoreClick = (messageId) => {
    setSelectedMessageId(SelectedMessageId === messageId ? null : messageId);  // Toggle visibility for the clicked message's options
  };
  
   
    return (
      <div className="ChatWindowRightSide">
                    
          <div className="messages">       
              {MessagesEtAppels.map((msg, index) => (
                  <div key={index} className="BoxMessage">
                     {/* User image */}
                     <div>
                            <img src="https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg"  alt="User" className={`w-8 h-8 rounded-full`}></img>
                     </div>
                    {console.log(msg)}
                    {/* Message content */}
                     <div className={`messageContent`}>{/** ${msg.sender === personCurrent ? 'MessageCourantUser' : 'MessageAutreUser'}*/}
                     {msg.type_objet === 'message'|| msg.type_objet === 'chat_message'  ? (//  msg.type === 'chat_message'  pour le chat temp real et autre quand recuper les messages
                      <div>
                        {/* Message content based on type_msg */}
                        {msg.type === 'text' ? (
                          <Message
                            timestamp={msg.timestamp}
                            content={msg.content}
                            //isCurrentUser={msg.sender === personCurrent}
                          />
                        ) : msg.type === 'audio' ? (
                          
                              <AudioMessage 
                                  key={index}
                                  audioUrl={msg.content}
                                  index={index}
                                  playingIndex={playingIndex}
                                  setPlayingIndex={setPlayingIndex}
                              />
                          
                        ) : msg.type === 'file' ? (
                         
                              <FileUpload selectedFile={msg.content} />
                                        
                        ) : null}

                       

                      </div>
                    ) : msg.type_objet === 'videocall'|| msg.type_objet === 'call_invitation'?  ( 
                      <div className="video_call">
                        {/*<p>
                          <i className="fa-solid fa-phone"></i>
                          <strong>{msg.caller}</strong> started a call
                        </p>*/}
                        <p><small>Start Time: {msg.start_time}</small></p>
                        {msg.end_time ? (
                          <p><small>End Time: {msg.end_time}</small></p>
                        ) : (
                          <p>Status: {msg.status}</p>
                        )}
                        {/* button to join the call */}
                        {!msg.end_time && (
                          <button onClick={() => goToVideoCall(msg.id)} className="btn btn-success mt-2">Join Call</button>
                        )}
                      </div>
                    ): null}

                    {/* Auto scroll to latest message */}
                          <div ref={messagesEndRef} />
                      {/*</div>*/}


                     </div>
                     
                     {/* Options box (conditionally rendered) absolute right-0 top-0*/}
                     {msg.type_objet === 'chat_message' || msg.type_objet === 'message' ? (
                        <div>{/**className={` ${msg.sender === personCurrent ? 'order-first' : ''}`} */}
                          <FiMoreHorizontal onClick={() => handleMoreClick(msg.id)} className="cursor-pointer" />
                          {SelectedMessageId === msg.id && (
                            <div className="absolute bg-white shadow-lg rounded-md p-2 mt-2 right-0">
                              <button
                                onClick={() => handleDelete(msg.id)}
                                className="w-full text-red-500 text-sm p-2 hover:bg-gray-200 rounded flex justify-around items-end"
                              >
                                <FiTrash2 /> <span>Delete</span>
                              </button>
                              <button
                                onClick={() => handleEdit(msg.id)}
                                className="w-full text-blue-500 text-sm p-2 hover:bg-gray-200 rounded flex justify-around items-end"
                              >
                                <FiEdit3 /> <span>Edit</span>
                              </button>
                            </div>
                          )}
                       </div>
                        ) : null}


                  </div>
              ))}
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
      "sender": { "id": 4, "first_name": "Sami", "last_name": "Ali", "photo": "/media/sami.jpg" },
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