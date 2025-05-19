import { useEffect, useState,useContext } from "react";
import '../styles/profilePage.css';
import ChatApp from './ChatApp';
import axios from 'axios';
import DataTable from '../Components/DataTable/DataTable';
import { AuthContext } from '../auth/AuthContext';
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  
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
    /*fetchAppointments();
    fetchOrders();
    fetchRecommendations();*/
  }
  }, [isLoading, user]);

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

  const fetchAppointments = () => {
    axios.get('http://127.0.0.1:8000/api/gestion-sessions/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => setAppointments(res.data)).catch(console.error);
  };

  const fetchOrders = () => {
    axios.get('http://127.0.0.1:8000/api/gestion-library/orders/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => setOrders(res.data)).catch(console.error);
  };

  const fetchRecommendations = () => {
    axios.get('http://127.0.0.1:8000/api/gestion-library/recommendations/', {
      headers: { Authorization: `Bearer ${user?.access}` }
    }).then(res => setRecommendations(res.data)).catch(console.error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };
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
  const handleProfilePictureChange = (e) => {
   const file = e.target.files[0];
   if (file) {
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file)); // aperçu local
   }
  };


  const handleSaveProfile = (e) => {
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
    for (let key in editData.user) {
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
    if (Object.keys(modifiedData.user).length === 0 && Object.keys(modifiedData).length === 1 ) {
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
  };

  if (!user || isLoading || !userInfo) return <div>Chargement...</div>;
  return (
    <div className="profile-container">
      
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActiveSection("profile")}>Account</li>
          <li onClick={() => setActiveSection("appointments")}>Appointments</li>
          <li onClick={() => setActiveSection("messages")}>Messages</li>
          <li onClick={() => setActiveSection("orders")}>List Commandes</li>
          <li onClick={() => setActiveSection("recommendations")}>List Recommandations</li>
        </ul>
      </aside>
      <main className="profile-main">
  
        <div className="profile-banner">
          <img src="src/assets/signIn.png" alt="Profile Header" className="banner-img" />
        </div>
        <div className="profile-header">
          {/*<img className="profile-pic" src="/src/assets/author.png" alt="profile" />*/}
          <div className="image-preview">
              <img
                src={preview || userInfo.user?.photo}
                alt="Profile"
                className="profile-pic"
                style={{ maxWidth: '120px', maxHeight: '120px', borderRadius: '50%' }}
              />
          </div>
          
            {/* Input pour changer d’image */}
            <input
              type="file"
              name="profilePicture"
              onChange={handleProfilePictureChange}
              accept="image/*"
            />
          <div className="user-info">
            <h2>{userInfo.user?.first_name} {userInfo.user?.last_name}</h2>
            <p>{userInfo.user?.email}</p>
          </div>
        </div>

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
             {/*<input
                  name="email"
                  value={userInfo.user?.email || ''}
                  onChange={ (e) => handleNestedChange(e, "user")}
                  placeholder="Email"
                  disabled
                />  */}
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

            <div className="form-actions">
              {/*<button type="button" className="cancel-btn">Cancel</button>*/}
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </section>
        )}
         {/* SECTION: Messages */}
        {activeSection === "messages" && (
          <section className="appointments-section">
            <ChatApp />
          </section>
        )}
        {/* SECTION: Rendez-vous */}
        {activeSection === "appointments" && (
          <section className="appointments-section">
            {/*<h3>My Appointments</h3>
            <p>You can see your upcoming or past appointments here.</p>
            <div className="appointment-card">
              <p><strong>Therapist:</strong> Dr. Jane Doe</p>
              <p><strong>Date:</strong> May 25, 2025</p>
              <p><strong>Time:</strong> 14:00</p>
              <button className="save-btn">Join Session</button>
            </div>*/}
            <DataTable
            title="My Appointments"
            columns={[
              { header: "Therapist", accessor: "therapist_name" },
              { header: "Date", accessor: "date" },
              { header: "Time", accessor: "time" }
            ]}
            data={appointments}
          />
          </section>
        )}
       
        {/* SECTION: Commandes */}
        {activeSection === "orders" && (
          <section className="appointments-section">
            {/*<h3>My Orders</h3>
            {orders.map((order, index) => (
              <div key={index} className="appointment-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> {order.total}€</p>
              </div>
            ))}*/}
            <DataTable
            title="My Orders"
            columns={[
              { header: "Order ID", accessor: "id" },
              { header: "Status", accessor: "status" },
              { header: "Total (€)", accessor: "total" }
            ]}
            data={orders}
          />
          </section>
        )}

        {/* SECTION: Recommandations */}
        {activeSection === "recommendations" && (
          <section className="appointments-section">
           {/* <h3>My Recommendations</h3>
            {recommendations.map((rec, index) => (
              <div key={index} className="appointment-card">
                <p><strong>Book:</strong> {rec.book_title}</p>
                <p><strong>Recommended by:</strong> {rec.therapist_name}</p>
                <p><strong>Reason:</strong> {rec.reason}</p>
              </div>
            ))}*/}
            <DataTable
            title="My Recommendations"
            columns={[
              { header: "Book", accessor: "book_title" },
              { header: "Therapist", accessor: "therapist_name" },
              { header: "Reason", accessor: "reason" }
            ]}
            data={recommendations}
          />

          </section>
        )}  
      </main>
    </div>
  );
}
