import { useEffect, useState,useContext } from "react";
import '../styles/profilePage.css';

import ChatApp from './ChatApp'
import Appointments from '../Components/AppointmentsTable/Appointments';
import Orders from '../Components/OrdersTable/Orders';
import Recommendations from '../Components/RecommendationsTable/Recommendations';

import axios from 'axios';
//import DataTable from '../Components/DataTable/DataTable';
import { AuthContext } from '../auth/AuthContext';
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const LANGUAGES = ["Français", "Anglais", "Espagnol", "Allemand", "Arabe", "Chinois"];
  // États pour chaque section
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);//{}
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  // Pour gérer la modification des infos perso
  const [editData, setEditData] = useState({});
  // 🗒️ le user contient le token de l'utilisateur connecté 
  // 🗒️ le userinfo contient les informations de l'utilisateur connecté (first_name,last_name,role,user_id)
  const {userinfo,updateUserInfo ,user,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur

  useEffect(() => {
    if (!isLoading && user) {
    fetchProfileData();
    /*
    fetchRecommendations();*/
  }
  }, [isLoading, user]);
  // 📥 Récupère les infos du profil utilisateur
  const fetchProfileData = () => {
    console.log(user?.access)
    axios.get('http://127.0.0.1:8000/api/GestionAccounts/Profile/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {
      //setUserData(res.data); 
      setUserInfo(res.data);
      setEditData(res.data); // Pour les modifications
      console.log(res.data)
      console.log(userInfo)
      console.log(editData)
    }).catch(console.error);
  };
  

// 📤 Champs simples (non imbriqués dans user)
  const handleInputChange = (e) => {//pour que soit le champ inmodifaible
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

// 📤 Gestion des champs imbriqués dans "user"
   const handleNestedChange = (e, parentKey = "user") => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [name]: value
      }
    }));
  };
  const handleLanguageCheckboxChange = (e, langue) => {
  const isChecked = e.target.checked;
  setUserInfo((prev) => {
    const currentLanguages = prev.languages_spoken || [];
    const updatedLanguages = isChecked
      ? [...currentLanguages, langue]
      : currentLanguages.filter((l) => l !== langue);

    return { ...prev, languages_spoken: updatedLanguages };
  });
};
// 📷 Changement de photo de profil
  const handleProfilePictureChange = (e) => {
   const file = e.target.files[0];
   if (file) {
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file)); // aperçu local
    console.log(file)
    console.log(URL.createObjectURL(file))
   }
  };

// 💾 Sauvegarde des modifications
  const handleSaveProfile = (e) => {
    e.preventDefault();
     const formData = new FormData();
     
     const modifiedData = {};
     modifiedData.user = {};
     const current = userInfo; // ce que l'utilisateur a modifié

     
     for (let key in editData.user) {
      console.log(key)
      if (key === 'photo') continue; // Déjà traité|| key === 'id'
      if (current.user[key] !== editData.user[key]) {
          //modifiedData.user[key] = current.user[key];
           formData.append(`user.${key}`, current.user[key]);
      }
     } 
     
     // Si rôle = patient, rien de plus à ajouter
     if (userinfo.role === "therapeute") {
         for (let key in current) {
             if (key === 'user' || key === 'id' || key==="languages_spoken") continue; // Déjà traité|| key === 'id'
             if (current[key] !== editData[key]) {
                 // modifiedData[key] = current[key];
                 formData.append(`${key}`, current[key] || "");
             }
          } 
     
        if (Array.isArray(current.languages_spoken)) {
           formData.append("languages_spoken", JSON.stringify(current.languages_spoken));
        }
     }
    
     if (profilePicture) {//
       formData.append("user.photo",profilePicture);
     }
     console.log(formData)
   
    axios.put('http://127.0.0.1:8000/api/GestionAccounts/Profile/update/',  formData, {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {
      setUserData(res.data);
      if (userInfo.user?.first_name != userinfo.first_name  || userInfo.user?.last_name != userinfo.last_name){
          updateUserInfo()
      }
      alert("Informations sauvegardées avec succès.");
    }).catch(console.error);
  };

  if (!user || isLoading || !userInfo) return <div>Chargement...</div>;
  return (
    <div className="profile-container">
      
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActiveSection("profile")}>Account</li>
          <li onClick={() => setActiveSection("appointments")}>Appointments</li>
          <li onClick={() => setActiveSection("messages")}>Messages</li>
          {userinfo && userinfo.role === "patient" && (
              <li onClick={() => setActiveSection("Orders")}>Orders</li>
          )}
          {userinfo && userinfo.role === "therapeute" && (
            <>
               <li onClick={() => setActiveSection("recommendations")}>Recommandations</li>
               <li onClick={() => setActiveSection("documents")}>Documents</li>
            </>
           )}
        </ul>
      </aside>
      <main className="profile-main">
  
        <div className="profile-banner">
          <img src="src/assets/signIn.png" alt="Profile Header" className="banner-img" />
        </div>
        <div className="profile-header">

          <div className="profil">
              <div className="image">
                    <img src={`http://127.0.0.1:8000${userInfo.user?.photo}`} alt="Profile" />
                     {activeSection === "profile" && (
                         <i className="fa-solid fa-camera" onClick={() => document.getElementById('profilePictureInput').click()}></i>
                     )}
              </div>
              <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    //ref={fileInputRef}
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
              />
           </div>
          <div className="profil-user-info">
            <h2>{userInfo.user?.first_name} {userInfo.user?.last_name}</h2>
            <p>{userInfo.user?.email}</p>
          </div>
        </div>

{/************************************************************************************************************************* */}
        {activeSection === "profile" && (
        <section className="personal-info">
          <h3>Personal information</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <form onSubmit={handleSaveProfile}>
            <div className="form-row">
               <input
                  name="first_name"
                  value={userInfo.user?.first_name || ''}
                  onChange={ (e) => handleNestedChange(e, "user")}
                  placeholder="First name"
                />
                <input
                  name="last_name"
                  value={userInfo.user?.last_name || ''}
                  onChange={ (e) => handleNestedChange(e, "user")}
                  placeholder="Last name"
                />         
             </div>
             <select
                name="sexe"
                value={userInfo.user?.sexe || ''}
                onChange={ (e) => handleNestedChange(e, "user")}
              >
                <option value="">Select gender</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
              <input
                type="date"
                name="date_naissance"
                value={userInfo.user?.date_naissance || ''}
                onChange={ (e) => handleNestedChange(e, "user")}
                placeholder="Birth date"
              />
              <input
                name="adresse"
                value={userInfo.user?.adresse || ''}
                onChange={ (e) => handleNestedChange(e, "user")}
                placeholder="Street address"
              />

            <div className="form-row">
              <input
                 name="telephone"
                 value={userInfo.user?.telephone || ''}
                 onChange={ (e) => handleNestedChange(e, "user")}
                 placeholder="Phone number"
              />
              <input placeholder="State / Province" />
              <input placeholder="ZIP / Postal code" />
            </div>

           {userinfo && userinfo.role === "therapeute" && (
            <>
        
            <div className="form-row">
              {/*<label>Annees Experience :</label>*/}
              <input
               type="number"
               name="annees_experience"
               value={userInfo.annees_experience || ''}
               onChange={handleInputChange}
               placeholder="Années d'expérience"
              />
              <input
               type="number"
               step="0.01"
               name="tarif_horaire"
               value={userInfo.tarif_horaire || ''}
               onChange={handleInputChange}
               placeholder="Tarif horaire (€)"
              />
            </div>
             {/*<input
               type="text"
               name="languages_spoken"
               value={(userInfo.languages_spoken || []).join(', ')}
               onChange={(e) =>
                 setEditData(prev => ({ ...prev, languages_spoken: e.target.value.split(',').map(lang => lang.trim()) }))
               }
               placeholder="Langues parlées (séparées par des virgules)"
             />*/}

             {/* Nouveau champ Langues parlées */}
                 <label>Langues parlées :</label>
                 {LANGUAGES.map((langue) => (
                   <div key={langue} className="checkbox-option">
                     <input
                       type="checkbox"
                       value={langue}
                       checked={userInfo.languages_spoken?.includes(langue)}
                       onChange={(e) => handleLanguageCheckboxChange(e, langue)}
                       id={`lang-${langue}`}
                     />
                     <label htmlFor={`lang-${langue}`}>{langue}</label>
                   </div>
                 ))}
            <label>Mes Specialites :</label>
            {userInfo.specialites.map((spec) => (
              
                <div key={spec} className="checkbox-option">
                        <input
                          type="checkbox"
                          value={spec}
                          checked={userInfo.specialites?.includes(spec)}
                          //onChange={handleInputChange}
                          disabled
                          id={`spec-${spec.id_specialite}`}
                        />
                        <label htmlFor={`spec-${spec.id_specialite}`}>{spec.nom} </label>
                  </div>
              ))}
              <textarea
                name="bio"
                value={userInfo.bio || ''}
                onChange={ (e) => handleNestedChange(e, "user")}
                placeholder="Votre biographie"
              />
            </>
          )}

            <div className="form-actions">
              {/*<button type="button" className="cancel-btn">Cancel</button>*/}
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </section>
        )}
{/************************************************************************************************************************* */}
         {/* SECTION: Messages */}
        {activeSection === "messages" && (
          <section className="appointments-section">
            <ChatApp />
          </section>
        )}
{/************************************************************************************************************************* */}
        {/* SECTION: Rendez-vous */}
        {activeSection === "appointments" && (
          <section className="appointments-section">
           <Appointments />
          </section>
        )}
{/************************************************************************************************************************* */}
        {activeSection === "Orders" && (
            <section className="commandes-section">
              <Orders />
            </section>
          )}

{/************************************************************************************************************************* */}
      
        {/* SECTION: Recommandations */}
        {activeSection === "recommendations" && (
          <section className="appointments-section">
            <Recommendations />
          </section>
        )}  
      </main>
    </div>

  );
}
 

 {/*<DataTable
               title="My Recommendations"
               columns={[
                 { header: "Book", accessor: "book_title" },
                 { header: "Therapist", accessor: "therapist_name" },
                 { header: "Reason", accessor: "reason" },
                 { header: "Status", accessor: "status" },
               ]}
               data={recommendations}
          />*/}
/**
 e.preventDefault();
    const formData = new FormData();
   // const original = userinfo; // ce que contient le token
    const current = userInfo; // ce que l'utilisateur a modifié

     // Construire l'objet avec uniquement les champs modifiés
    const modifiedData = {};
     modifiedData.user = {}; 

  // Préparer l'objet `user` s’il y a des changements à ce niveau
  const userModified = {};

    /*for (let key in current) {
       if (current[key] !== original[key]) {
          modifiedFields[key] = current[key];
       }
     }*/
    // Comparer les données de `current` et `original` pour chaque champ
   /* for (let key in editData.user) {
      console.log(key)
      if (current.user[key] !== editData.user[key]) {
          modifiedData.user[key] = current.user[key];
      }
    }
    // Comparer les champs racines (ex: `adresse`, `sexe`, etc.)
    for (let key in current) {
       if (key === 'user') continue; // Déjà traité|| key === 'id'
       if (current[key] !== editData[key]) {
           modifiedData[key] = current[key];
       }
    }
     // Supprimer `user` si aucun champ n'a été modifié à l'intérieur
    /*if (Object.keys(modifiedData.user).length === 0) {
      delete modifiedData.user;
     }*/

    // Ne rien envoyer si aucun champ n’est modifié
    /*if (Object.keys(modifiedData.user).length === 0 && Object.keys(modifiedData).length === 1 ) {
       alert("Aucune modification détectée.");
       return;
    }
    console.log(user?.access)
    
    axios.put('http://127.0.0.1:8000/api/GestionAccounts/Profile/update/',  modifiedData, {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => {
      setUserData(res.data);
      if (userInfo.user?.first_name != userinfo.first_name  || userInfo.user?.last_name != userinfo.last_name){
          updateUserInfo()
      }
      alert("Informations sauvegardées avec succès.");
    }).catch(console.error);

*/