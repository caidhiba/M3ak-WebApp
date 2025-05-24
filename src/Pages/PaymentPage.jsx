import React, { useContext, useState } from "react";
import "../Styles/PaymentPage.css";
import { AuthContext } from '../auth/AuthContext';
import cardImage from "../assets/visa-card.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; 
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user,userinfo, isLoading ,isAuthenticated } = useContext(AuthContext);
  const { id, message} = location.state || {};//, appointmentDetails
  const [reçuFile, setReçuFile] = useState(null);
  const [formData, setFormData] = useState({
    methode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    montant:"",
  });

  const handleReçuChange = (e) => {
    setReçuFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    // TODO: ajouter l'envoi de reçuFile + id de commande via axios
    if (!user || !userinfo || !isAuthenticated ) {return ;}
    if ((formData.methode === "mandat" || formData.methode === "baridi") && !reçuFile) {
      alert("Veuillez télécharger le reçu de paiement.");
      return;
    }
    
    // Détermination du type de paiement
    let type_paiement = "abonnement";
    if (message === 'Payee Resarvation Session') {
      type_paiement = "seance";
    } else if (message === 'Payee Commande Book') {
       type_paiement = "livre";
    }
    console.log(type_paiement);
    
    
    /*const updatedFormData = {
      ...formData,
       payment_type: message === 'Payee Resarvation Session' ? "session" : "autre"
    };*/

    
    const payload = new FormData();
    if (reçuFile) payload.append("recu", reçuFile);
    payload.append("type_paiement", type_paiement);
    if (id) payload.append("id", id);
    for (const key in formData) {
        if (key == "methode" ) { //|| key =="montant"
        payload.append(key, formData[key]);
      }
    }
    //if (userinfo.role === "therapeute") {
      //alert(`Paiement d'abonnement en cours`);
    //} else {
      //alert(`Paiement en cours pour le rendez-vous ID : ${id}`);
     // if (message ==='Payee Resarvation Session'){
            //formData.payment_type = "session";
            axios.post(`http://127.0.0.1:8000/api/gestion-paiement/paiement/`,payload,{
                  headers: {
                   Authorization: `Bearer ${user.access}`
                  }
                }
             ).then(response => {
                   alert('le paiement est effectué avec succès ');
                   navigate('/');
              }).catch(error => {
                   if (error.response) {
                     console.error(error.response);
                     alert(error.response.data.detail || "Erreur lors de la commande.");
                   } else {
                     alert("Erreur réseau.");
                   }
               });
      /*}else if (message ==='Payee Commande Book'){
          
      } */  
   // }
    // navigate('/confirmation');
  };

  const handleCancel = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="payment-container">
      {/* Left side: the form */}
      <div className="form-section">
        <h2>Méthode de paiement</h2>
        
        {userinfo && userinfo.role === "therapeute" ? (
          <>
            <p className="payment-description">Paiement de votre abonnement mensuel</p>
            {/*<div className="payment-summary">
              <h4>Récapitulatif</h4>
              <p>Type: Abonnement professionnel</p>
              <p>Montant: 2000 DA/mois</p>
            </div>*/}
          </>
        ) : (
          <>
            <p className="payment-description">{message}</p>
            {/*appointmentDetails && (
              <div className="payment-summary">
                <h4>Récapitulatif du rendez-vous</h4>
                <p>Thérapeute: {appointmentDetails.therapistName}</p>
                <p>Date: {appointmentDetails.date}</p>
                <p>Heure: {appointmentDetails.time}</p>
                <p>Montant: {appointmentDetails.price} DA</p>
              </div>
            )*/}
          </>
        )}
        
        <form onSubmit={handlePay}>
          <div className="form-group">
            <label>Méthode de paiement</label>
            <select
              name="methode"
              className="payment-input"
              value={formData.methode}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez votre méthode</option>
              <option value="carte">Carte Bancaire</option>
              <option value="mandat">Mandat</option>
              <option value="baridi">Baridi Mob</option>
            </select>
          </div>

          {formData.methode === "carte" && (
            <>
              <div className="form-group">
                <label>Numéro de carte</label>
                <input 
                  type="text" 
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456" 
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="row">
                <div className="form-group">
                  <label>Date d'expiration</label>
                  <input 
                    type="text" 
                    name="expiry"
                    placeholder="MM/AA" 
                    value={formData.expiry}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input 
                    type="text" 
                    name="cvv"
                    placeholder="123" 
                    value={formData.cvv}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Pays</label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="dz">Algérie</option>
              <option value="fr">France</option>
              <option value="us">États-Unis</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Adresse</label>
            <input 
              type="text" 
              name="address"
              placeholder="Rue / Numéro" 
              value={formData.address}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="row">
            <div className="form-group">
              <input 
                type="text" 
                name="city"
                placeholder="Ville" 
                value={formData.city}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="state"
                placeholder="État / Province" 
                value={formData.state}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="postalCode"
                placeholder="Code Postal" 
                value={formData.postalCode}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          {(formData.methode === "mandat" || formData.methode === "baridi") && (
            <div className="form-group">
              <label>Importer le reçu (PDF)</label>
              <input
                id="reçu"
                type="file"
                accept=".pdf"
                onChange={handleReçuChange}
                required
              />
              <p className="file-hint">Veuillez télécharger votre reçu de paiement</p>
            </div>
          )}

          <div className="form-buttons">
            <button type="button" className="cancel" onClick={handleCancel}>Annuler</button>
            <button type="submit" className="pay">Confirmer le paiement</button>
          </div>
        </form>
      </div>

      {/* Right side: image + plan */}
      <div className="side-section">
        <img src={cardImage} alt="Card" className="card-image" />

        {!isLoading && userinfo && userinfo.role === "therapeute" && (
          <div className="plan-section">
            <h4>Choisissez votre formule</h4>
            <p>Accédez à tous les avantages de notre plateforme professionnelle</p>

            <div className="plan-box">
              <input type="radio" name="plan" id="basic-plan" />
              <div>
                <label htmlFor="basic-plan">
                  <strong>Formule Basique - 2000 DA/mois</strong>
                  <p>Profil visible, 5 rendez-vous/mois</p>
                </label>
              </div>
            </div>

            <div className="plan-box">
              <input type="radio" name="plan" id="premium-plan" />
              <div>
                <label htmlFor="premium-plan">
                  <strong>Formule Premium - 1500 DA/mois</strong>
                  <p>Profil mis en avant, rendez-vous illimités</p>
                </label>
              </div>
            </div>

            <div className="plan-benefits">
              <h5>Avantages inclus :</h5>
              <ul>
                <li>Tableau de bord professionnel</li>
                <li>Gestion des rendez-vous</li>
                {/*<li>Support technique</li>*/}
                <li>Statistiques de consultation</li>
              </ul>
            </div>
          </div>
        )}

        {!isLoading && userinfo && userinfo.role !== "therapeute" && (
          <div className="payment-info">
            <h4>Informations de paiement sécurisé</h4>
            <p>Toutes les transactions sont cryptées et sécurisées.</p>
            <div className="security-badges">
              <div className="badge">SSL</div>
              <div className="badge">3D Secure</div>
            </div>
            <p className="support-text">Un problème ? Contactez notre support.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;