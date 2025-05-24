import React from 'react';

function Message({ timestamp, content }) {//,fileName,audioData
    // Convertir la chaîne ISO en objet Date
  /*const date = new Date(timestamp);

  // Formater en jj/mm/aa
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });*/
  /*const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
  const year = String(date.getFullYear()).slice(2); // Derniers 2 chiffres de l'année
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year} à ${hours}:${minutes}`;*/
    return (
       <div>             
            <p>{content}</p>
            <span className='user-comment'><strong> {timestamp}</strong></span>
        </div>
    );
}

export default Message;
