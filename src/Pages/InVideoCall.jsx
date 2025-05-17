import React, { useEffect, useState,useRef,useContext } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import CosmosNodeNetwork from "../Components/ChatRoom/CosmosNodeNetwork";

import {FaPhoneAlt ,FaVideo, FaMicrophone, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa'; // Importer des icônes de FontAwesome
import { MdVideoCall, MdMic, MdMicOff } from 'react-icons/md'; // Importer des icônes de Material Design
//import '../VideoChat.css'; // Importer le fichier CSS pour le style
import axios from "axios";
import { useLocation ,useNavigate} from "react-router-dom";
import "../Styles/VideoCall.css"
//const APP_ID = "b4ec67d6d68743cd83cba0ee704c55ac";  // Remplace par ton App ID Agora
//const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
import { AuthContext } from '../auth/AuthContext';
const DEFAULT_PROFILE_PIC="https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg"
const TOKEN = null;
const VideoCall = () => {
    const location = useLocation();
    const { idCall } = location.state || {}; // Récupérer l'ID de l'appel
    const CHANNEL = "" + idCall;
    const [token, setToken] = useState(null);
    const client = useRef(null); // 🔥 On utilise useRef pour stocker le client Agora
    const localPlayerRef = useRef(null);
    const remotePlayerRef = useRef(null); // Référence pour le conteneur vidéo distant
    console.log(idCall)
    const [localTracks, setLocalTracks] = useState({ videoTrack: null, audioTrack: null });
    const [remoteUsers, setRemoteUsers] = useState({});
    const [joined, setJoined] = useState(false);
    const [userCount, setUserCount] = useState(0); // 🔥 Nombre de participants
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);  // Caméra activée par défaut
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);  // Micro activé par défaut
    const [app_id, setAppId] = useState(null); // ID de l'application Agora
    //const [profilePicURL, setprofilePicURL] = useRef(null);
    // Image de profil par défaut
    const timerInterval = useRef(null);
    const [startTime, setStartTime] = useState(null);
    const [callDuration, setCallDuration] = useState(0); // en secondes
    const navigate = useNavigate();
    const {userinfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur

    const DEFAULT_PROFILE_PIC = "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg";
    
    const goToMyContactes=() => {
        navigate('/MyContactes');
    };
    useEffect(() => {//hook
        client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });//Initialisation du client
        client.current.on("user-published", handleUserPublished);
        client.current.on("user-unpublished", handleUserUnpublished);

        return () => {
            client.current.off("user-published", handleUserPublished);
            client.current.off("user-unpublished", handleUserUnpublished);
        };
    }, []);

    const join = async () => {
        console.log(user?.access)
        if (isLoading || joined || !client.current) return; // 🔥 Empêcher de rejoindre plusieurs fois
        axios.get(`http://127.0.0.1:8000/api/GestionCommunication/video_call/get-token/${idCall}/`, {
                headers: {
                  Authorization: `Bearer ${user?.access}`,
                },
              }
        )
            .then(response => {
                console.log("Token récupéré :", response.data);
                setToken(response.data.token);
                setAppId(response.data.app_id);
                //setChannelName(response.data.channel_name);
            })
            .catch(error => console.error("Erreur lors de la récupération du token", error));
        try {
            const uid = await client.current.join(app_id, CHANNEL, token  || null);//TOKEN
            const audioTrack = isAudioEnabled ? await AgoraRTC.createMicrophoneAudioTrack() : null;
            const videoTrack = isVideoEnabled ? await AgoraRTC.createCameraVideoTrack() : null;
            setLocalTracks({ audioTrack, videoTrack });

            if (videoTrack && localPlayerRef.current) {
                videoTrack.play(localPlayerRef.current);
            }
            console.log(uid)
            console.log(localPlayerRef)
            await client.current.publish([audioTrack, videoTrack].filter(track => track !== null));
            console.log(client.current)
            console.log(client)  // Publier seulement les pistes activées
            setJoined(true);
            console.log(audioTrack)
            console.log(videoTrack)


            

            const now = Date.now();
            setStartTime(now);
            timerInterval.current = setInterval(() => {
                     const seconds = Math.floor((Date.now() - now) / 1000);
                     setCallDuration(seconds > 3600 ? 3600 : seconds); // max 1h (3600s)
            }, 1000);


        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    const leave = async () => {
        if (!joined || !client.current) return; // 🔥 Empêcher de quitter si pas connecté

        try {
            if (localTracks.videoTrack) localTracks.videoTrack.stop();
            if (localTracks.audioTrack) localTracks.audioTrack.stop();

            await client.current.leave();
            setLocalTracks({ videoTrack: null, audioTrack: null });
            setRemoteUsers({});
            setJoined(false);
            setUserCount(0); // 🔥 Reset du compteur

            if (timerInterval.current) {
                clearInterval(timerInterval.current);
                timerInterval.current = null;
              }
            setStartTime(null);
            setCallDuration(0); // Reset de la durée d'appel

            goToMyContactes(); // Rediriger vers la page MyContactes
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    const handleUserPublished = async (user, mediaType) => {
       
            await client.current.subscribe(user, mediaType);
            setRemoteUsers(prevUsers => {
                const newUsers = { ...prevUsers, [user.uid]: { ...user, hasVideo: mediaType === "video", hasAudio: mediaType === "audio" } };
                setUserCount(Object.keys(newUsers).length+1);
                return newUsers;
            });
        
            if (mediaType === "video") {
                document.getElementById("remote-playerlist").innerHTML = "";
                const playerContainer = document.createElement("div");
                playerContainer.id = `player-${user.uid}`;
                playerContainer.className = "remote-player w-full h-full bg-black";
                document.getElementById("remote-playerlist").appendChild(playerContainer);
                user.videoTrack.play(playerContainer);
            }

    };

    const handleUserUnpublished = (user, mediaType) => {
            setRemoteUsers(prevUsers => {
                const newUsers = { ...prevUsers };
                if (mediaType === "video") {
                    newUsers[user.uid].hasVideo = false;
                } else if (mediaType === "audio") {
                    newUsers[user.uid].hasAudio = false;
                }
                return newUsers;
            });
        
            const playerContainer = document.getElementById(`player-${user.uid}`);
            /*if (playerContainer && mediaType === "video") {
                playerContainer.classList.add("hidden");
            }else{
                playerContainer.classList.remove("hidden");
            }*/
    };


    const toggleVideo = async () => {
        if (localTracks.videoTrack) {
            if (isVideoEnabled) {
                // Stop and unpublish the video track
                localTracks.videoTrack.stop();
                await client.current.unpublish(localTracks.videoTrack);
            } else {
                // Create and publish a new video track
                const videoTrack = await AgoraRTC.createCameraVideoTrack();
                await client.current.publish(videoTrack);
                videoTrack.play(localPlayerRef.current);
                setLocalTracks(prev => ({ ...prev, videoTrack }));
            }
            setIsVideoEnabled(!isVideoEnabled);
        }
      };
    
      const toggleAudio = async () => {
         if (localTracks.audioTrack) {
            if (isAudioEnabled) {
                // Stop and unpublish the audio track
                localTracks.audioTrack.stop();
                await client.current.unpublish(localTracks.audioTrack);
            } else {
                // Create and publish a new audio track
                const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                await client.current.publish(audioTrack);
                setLocalTracks(prev => ({ ...prev, audioTrack }));
            }
            setIsAudioEnabled(!isAudioEnabled);
         }
      };
      const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
      
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      };
    return (
        <div className="call-container">{/** flex flex-col h-screen items-center inset-shadow-sm inset-shadow-indigo-500 bg-blue-100 relative*/}

             <CosmosNodeNetwork />
            <h3 className="call-header">Participants dans l'appel : {userCount}</h3>{/**hidden text-xl font-semibold mb-4 */}
            {joined && (
                <div
                     className={`call-duration ${callDuration >= 3300 ? 'long' : 'short'}`}
                >
                 Durée : {formatDuration(callDuration)}{/*`absolute top-4 right-4 px-3 py-1 rounded text-white font-mono text-sm
                       ${callDuration >= 3300 ? 'bg-red-600' : 'bg-black'}
                   `*/}
           </div>
            )}
         
          <div className="call-main">{/**p-4 flex w-full h-full flex-col items-center justify-center absolute z-10 */}
             <div className="video-wrapper">{/** rounded-xl relative h-full min-w-lg w-5/6 justify-center items-center overflow-hidden*/}
                  
                <div 
                    id="local-player" 
                    ref={localPlayerRef} 
                    className={`local-player ${userCount > 0 ? 'small' : 'fullscreen'}`}
                >{/*`bg-black rounded-lg border-4 border-gray-700 absolute transition-all duration-300 ${
                        userCount > 0 
                        ? "top-4 left-4 w-64 h-1/3 z-20"// w-40 h-28
                        :"w-full h-full z-10 object-cover" // w-9/10 h-9/10w-full h-full
                    }`*/}
                    {/* Afficher l'image de profil si la vidéo est désactivée*/ }
                    {!isVideoEnabled && (
                        <img 
                            src={DEFAULT_PROFILE_PIC} 
                            alt="Profile" 
                            className="remote-profile"
                        />
                    )}{/** "w-full h-full object-cover rounded-lg"*/}
                </div>
               {/*`w-9/10 h-full border-2 border-gray-700 ${userCount > 0 ? "z-0" : "z-10"}`*/}
                <div id="remote-playerlist" className="remote-playerlist">
                          {!Object.values(remoteUsers).hasVideo && userCount <=0  ? null : (
                            <img 
                              src={DEFAULT_PROFILE_PIC} 
                              alt="Profile" 
                              className="remote-profile" //w-full h-full
                             />
                          )}{/** "w-full h-full object-cover rounded-lg"*/}
                </div>
               
            </div>
            {/* Buttons */}
                 <div id="buttons_controles" className="buttons-controls"> 
      <div> 
        <button 
          onClick={join} 
          disabled={joined} 
          className={`button green ${joined ? "disabled hidden" : ""}`} 
        > 
          <FaPhoneAlt className="h-5 w-5" /> 
        </button> 
        <button 
          onClick={leave} 
          disabled={!joined} 
          className={`button red ${!joined ? "disabled hidden" : ""}`} 
        > 
          <FaPhoneAlt className="h-5 w-5" /> 
        </button> 
      </div> 
 
      <div> 
        <button 
          onClick={toggleVideo} 
          className={`button ${isVideoEnabled ? 'blue' : 'disabled'}`} 
        > 
          {isVideoEnabled ? <FaVideo className="h-5 w-5" /> : <FaVideoSlash className="h-5 w-5" />} 
        </button> 
        <button 
          onClick={toggleAudio} 
          className={`button ${isAudioEnabled ? 'blue' : 'disabled'}`} 
        > 
          {isAudioEnabled ? <FaMicrophone className="h-5 w-5" /> : <FaMicrophoneSlash className="h-5 w-5" />} 
        </button> 
      </div> 
    </div> 
  
  
          </div>
        </div>
    );
};
export default VideoCall;


/***
  
 */
