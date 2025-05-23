import { useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
function FichierMedicalForm({ sessionId,onSubmitSuccess}) {
  const [formData, setFormData] = useState({
    diagnostic: '',
    compte_rendu: '',
    recommandations: '',
    note_session: '',
  });
  const {userinfo,user,isAuthenticated,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };//
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/GestionAccounts/fichiers-medicaux/create/${sessionId}/`, formData,{
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
    })
      .then(res => {
        alert("Fichier médical enregistré !")
       
        if (onSubmitSuccess) {
          onSubmitSuccess(); // ➤ déclenche la fermeture dans le parent
        }     
      })
      .catch(err => alert("Erreur : " + err.message));
  };

  return (
    <div className='FichierMedicalForm review-form-modal'>
     
     <form onSubmit={handleSubmit} className='review-form-box'>
      <h3> remplire le fichier medicale  </h3>
      <button className="close-btn" onClick={() => setShowReviewForm(false)}>X</button>
      <label>Diagnostic:</label>
      <textarea name="diagnostic" onChange={handleChange} required />
      <label>Observations:</label>
      <textarea name="compte_rendu" onChange={handleChange} required  />
      <label>Recommandations:</label>
      <textarea name="recommandations" onChange={handleChange} required  />
      <label>Note Session</label>
      <input 
                type="number" 
                name="note_session" 
                //value={formData.yearsOfExperience} 
                onChange={handleChange} 
                min="0"
                max="10"
                required                
              />
      <button type="submit" className='submit-btn'>Submit</button>
    </form>

  </div>
  );
}
export default FichierMedicalForm;
