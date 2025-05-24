
import React, { useRef, useState,useContext} from 'react';
import { FiSend, FiPaperclip, FiMic } from 'react-icons/fi';

import { AuthContext } from '../../auth/AuthContext';
const InputChat = ({ handleSubmitMessage }) => {//message, setMessage,
    const {userinfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
    const [isRecording, setIsRecording] = useState(false);// pour la fonction de record audio
    const [message, setMessage] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [file, setFile] = useState(null);
  
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const fileInputRef = useRef();
    const audioRef = useRef(null);
    const personCurrent = userinfo.user_id;//.user_id; // Remplacez par la logique pour obtenir l'utilisateur courant
    let newMessage = null;
    
    // 📤 Envoi d'un message texte
    const handleSend = () => {
    if (message.trim() ) {
        console.log('Message:', message);
        newMessage = {
           type: 'message',
           type_msg: 'text',
           message: message,
           sendeur: personCurrent,
           action: 'create message',
        };
      setMessage('');
    }
    handleSubmitMessage(newMessage);
  };

   // 📎 Gestion des fichiers (image/pdf)
   const handleFileChange = (e) => {
    const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!acceptedFileTypes.includes(selectedFile.type)) {
      alert('Seuls les fichiers PDF, JPG, PNG et GIF sont acceptés');
      return;
    }

    setFile(selectedFile);
    handleSubmit(selectedFile);
  };

  const handleSubmit = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      newMessage = {
        type: 'message',
        type_msg: 'file',
        file: fileData,
        file_name: file.name,
        sendeur: personCurrent,
        action: 'create message',
      };
      handleSubmitMessage(newMessage);
      console.log('Fichier envoyé:', file.name);
    };
    reader.readAsDataURL(file);
  };
    
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  // 🎤 Audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const reader = new FileReader();

        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result.split(',')[1];
            newMessage = {
                type: 'message',
                type_msg: 'audio',
                audioData: base64Audio,
                sendeur: personCurrent,
                action: 'create message',
            };
            handleSubmitMessage(newMessage);

          console.log('Audio envoyé');
        };

        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      }, 7000);// Enregistre max 7 sec
    } catch (error) {
      console.error("Erreur d'accès au micro :", error);
    }
  };
  // 🔁 Nettoyer le stream/micro après utilisation
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

    return (
     <div className="InputChatRightSide">
      {/* 🎯 Input caché pour fichier */}
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {/* 📎 Bouton fichier */}
      <FiPaperclip
        className="iconChat"
        onClick={triggerFileInput}
        size={20}
      />

     {/* 🎙️ Bouton micro */}
      {!isRecording ? (
        //<button >
          <FiMic className="iconChat" onClick={startRecording} />
        //</button>
      ) : (
        //<button >
          <FiMic className="iconChat" onClick={stopRecording} />
        //</button>
      )}

       {/* 💬 Champ texte */}
      <input
        type="text"
        className="flex-grow p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* 📤 Bouton envoyer */}
      <button
        className="ButtonClick"
        onClick={handleSend}
      >
        <FiSend size={20} />
      </button>
        </div>
    );
};

export default InputChat;