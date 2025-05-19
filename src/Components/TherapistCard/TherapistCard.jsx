import React from "react";
import "./TherapistCard.css";

export default function TherapistCard({id ,name, client_type, description, image ,languages,specializations}) {
   // Limiter à 2 spécialités
  const displayedSpecs = specializations?.slice(0, 2) || [];
  const hasMoreSpecs = specializations?.length > 2;
  return (
    <div className="card">
      <img src={`${image}` } alt={name} className="card-img" />
      <div className="card-content">
        <h3>{name}</h3>
        <span className="card-category">
             <strong>Type client:</strong> {client_type }
        </span>
        {languages && languages.length > 0 && (
            <p><strong>Langues parlées :</strong> {languages.join(', ')}</p>
         )}
        <span className="card-category">
          {/*categories && categories.length > 0 ? categories.join(", ") : "Uncategorized"*/}
        </span>
        
        {/*specializations && specializations.length > 0 && (
        <div>
          <strong>Spécialisations :</strong>
          <ul>
            {specializations.map((spec, idx) => (
              <li key={idx}>{spec.nom}</li>
            ))}
          </ul>
        </div>
       )*/}
       {displayedSpecs.length > 0 && (
               <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                 <strong>Spécialisations :</strong>{' '}
                 {displayedSpecs.map((spec, idx) => (
                   <span key={idx}>
                     {spec.nom}{idx < displayedSpecs.length - 1 ? ', ' : ''}
                   </span>
                 ))}
                 {hasMoreSpecs && '...'}
               </p>
             )}
        <p>{description}</p>
        <a href="#">Read more →</a>
      </div>
    </div>
  );
}
