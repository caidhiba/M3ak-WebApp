import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext'; // adapte ce chemin si besoin
import './ListeFichiersMedical.css'
const ListeFichiersMedical = () => {
  const { user } = useContext(AuthContext); // Token d'auth
  const [fichiers, setFichiers] = useState([]);
  const [filteredFichiers, setFilteredFichiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minNote, setMinNote] = useState('');
  const [maxNote, setMaxNote] = useState('');
  useEffect(() => {
    const fetchFichiers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/GestionAccounts/fichiers-medicaux/', {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        });
        console.log('fichiers sont:',response.data)
        setFichiers(response.data);
        setFilteredFichiers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers médicaux :", error);
      }
    };

    if (user?.access) {
      fetchFichiers();
    }
  }, [user]);
useEffect(() => {
    const filtered = fichiers.filter((fichier) => {
      const matchKeyword =
        fichier.diagnostic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fichier.compte_rendu.toLowerCase().includes(searchTerm.toLowerCase());

      const note = fichier.note_session ?? -1;
      const withinNoteRange =
        (minNote === '' || note >= parseInt(minNote)) &&
        (maxNote === '' || note <= parseInt(maxNote));

      return matchKeyword && withinNoteRange;
    });

    setFilteredFichiers(filtered);
  }, [searchTerm, minNote, maxNote, fichiers]);
  return (
    <div className="fichiers-container">
      <h2>📄 Fiches Médicales</h2>
      <div className="filter-section">
         <div className="search-input-container">
           <input
            type="text"
            className="search-input"
            placeholder="Rechercher par mot-clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           />
           <span className="search-icon">🔍</span>
      </div>
  
      <div className="note-filters">
        <div className="note-input-container">
          <label htmlFor="min-note">Note min</label>
          <input
           id="min-note"
           type="number"
           className="note-input"
           min="0"
           max="10"
           placeholder="0"
           value={minNote}
           onChange={(e) => setMinNote(e.target.value)}
          />
        </div>
    
        <div className="note-input-container">
          <label htmlFor="max-note">Note max</label>
          <input
            id="max-note"
            type="number"
            className="note-input"
            min="0"
            max="10"
            placeholder="10"
            value={maxNote}
            onChange={(e) => setMaxNote(e.target.value)}
          />
       </div>
     </div>
  
     <button 
        className="reset-btn"
        onClick={() => {
        setSearchTerm('');
        setMinNote('');
        setMaxNote('');
       }}
      >
         Réinitialiser
     </button>
    </div>
    {fichiers.length === 0 ? (
        <p>Aucune fiche trouvée.</p>
    ) : (
        <table className="fichier-table">
          <thead>
            <tr>
              <th>ID Session</th>
              <th>Nom Patient</th>
              <th>Date</th>
              <th>Diagnostic</th>
              <th>Note</th>
              <th>Compte Rendu</th>
              <th>Recommandations</th>
            </tr>
          </thead>
          <tbody>
            {filteredFichiers.map((fichier) => (
              <tr key={fichier.id}>
                <td>{fichier.session.id}</td>
                <td>{fichier.session.patient.user.first_name} {fichier.session.patient.user.last_name}</td>
                <td>{new Date(fichier.date_remplissage).toLocaleString()}</td>
                <td>{fichier.diagnostic}</td>
                <td>{fichier.note_session ?? 'N/A'}</td>
                <td>{fichier.compte_rendu || '—'}</td>
                <td>{fichier.recommandations || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )}
    </div>
  );
};

export default ListeFichiersMedical;
