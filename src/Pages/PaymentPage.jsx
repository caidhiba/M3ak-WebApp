

// import React from "react";
// import '../Styles/PaymentPage.css';
// import cardImage from "../assets/visa-card.png"; 

// const PaymentPage = ({ role }) => {
//   return (
//     <div className="payment-container">
//       {/* Left side: the form */}
//       <div className="form-section">
//         <h2>Payment method</h2>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

//         <form>
//           <label>Name on invoice</label>
//           <input type="text" placeholder="Full Name" />

//           <label>Card number</label>
//           <input type="text" placeholder="Placeholder" />

//           <div className="row">
//             <div>
//               <label>Expiry</label>
//               <input type="text" />
//             </div>
//             <div>
//               <label>CVV</label>
//               <input type="text" />
//             </div>
//           </div>

//           <label>Email address</label>
//           <input type="email" placeholder="hello@example.com" />

//           <label>Country</label>
//           <select>
//             <option>Select one...</option>
//           </select>

//           <label>Street address</label>
//           <input type="text" />

//           <div className="row">
//             <input type="text" placeholder="City" />
//             <input type="text" placeholder="State / Province" />
//             <input type="text" placeholder="ZIP / Postal Code" />
//           </div>
//         </form>

//         {/* Show buttons here only if role is not therapist */}
//         {role !== "therapist" && (
//           <div className="form-buttons">
//             <button type="button" className="cancel">Cancel</button>
//             <button type="submit" className="pay">Pay</button>
//           </div>
//         )}
//       </div>

//       {/* Right side: image + plan */}
//       <div className="side-section">
//         <img src={cardImage} alt="Card" className="card-image" />

//         {role === "therapist" && (
//           <div className="plan-section">
//             <h4>Choose your plan</h4>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

//             <div className="plan-box">
//               <input type="radio" name="plan" />
//               <div>
//                 <strong>Basic plan 2000DA/month</strong>
//                 <p>Lorem ipsum dolor sit amet.</p>
//               </div>
//             </div>

//             <div className="plan-box">
//               <input type="radio" name="plan" />
//               <div>
//                 <strong>Business plan 2000DA/month</strong>
//                 <p>Lorem ipsum dolor sit amet.</p>
//               </div>
//             </div>

//             {/* Buttons appear here only for therapist */}
//             <div className="form-buttons">
//               <button type="button" className="cancel">Cancel</button>
//               <button type="submit" className="pay">Pay</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useContext, useState } from "react";
import "../Styles/PaymentPage.css";
import { AuthContext } from '../auth/AuthContext';
import cardImage from "../assets/visa-card.png";
//import { useRole } from "../auth/RoleContext"; // ✅ Make sure path is correct
import { useLocation ,useNavigate} from "react-router-dom";
const PaymentPage = () => {
  //const { role } = useRole(); // ✅ Get role from context
  const location = useLocation();
   // 🗒️ le userinfo contient les informations de l'utilisateur connecté (first_name,last_name,role,user_id)  fait userinfo.role
  const {userinfo,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  const { id ,message} = location.state || {};
  const [reçuFile, setReçuFile] = useState(null); // fichier PDF
  const handleReçuChange = (e) => {
    setReçuFile(e.target.files[0]);
    console.log("Fichier reçu sélectionné :", e.target.files[0]);
  };
  console.log(location.state)
  const handlePay = (e) => {
    e.preventDefault();
    // TODO: ajouter l'envoi de reçuFile + id de commande via axios
    alert(`Paiement en cours pour la commande ID : ${id}`);
  };
  return (
    <div className="payment-container">
      {/* Left side: the form */}
      <div className="form-section">
        <h2>Payment method</h2>
        {userinfo && userinfo.role === "therapeute" ? (
            <p>Payer Mon Abonnement</p>
        ) : (
          <p>{message}</p>
        )}
        
        <form onSubmit={handlePay}>
            <label>Numéro de carte</label>
            <input type="text" placeholder="1234 5678 9012 3456" required />
         
            <div className="row">
                <div>
                  <label>Expiration</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div>
                    <label>CVV</label>
                    <input type="text" placeholder="123" required />
                </div>
            </div>
         
            <label>Pays</label>
            <select required>
                <option value="">Sélectionner...</option>
                <option value="dz">Algérie</option>
                <option value="fr">France</option>
                <option value="us">États-Unis</option>
            </select>
         
            <label>Adresse</label>
            <input type="text" placeholder="Rue / Numéro" required />
         
            <div className="row">
                <input type="text" placeholder="Ville" required />
                <input type="text" placeholder="État / Province" required />
                <input type="text" placeholder="Code Postal" required />
            </div>
         
            <label>Importer le reçu (PDF)</label>
            <input
                     id="reçu"
                     type="file"
                     accept=".pdf"
                     onChange={handleReçuChange}
                     required
              />
         
              <div className="form-buttons">
                     <button type="button" className="cancel">Annuler</button>
                     <button type="submit" className="pay">Payer</button>
              </div>
        </form>

      </div>

      {/* Right side: image + plan */}
      <div className="side-section">
        <img src={cardImage} alt="Card" className="card-image" />

        {!isLoading && userinfo && userinfo.role === "therapeute" && (
          <div className="plan-section">
            <h4>Choose your plan</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <div className="plan-box">
              <input type="radio" name="plan" />
              <div>
                <strong>Basic plan 2000DA/month</strong>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="plan-box">
              <input type="radio" name="plan" />
              <div>
                <strong>Business plan 2000DA/month</strong>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

           {/**  <div className="form-buttons">
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="pay">Pay</button>
            </div>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
{/**
  <label>Name on invoice</label>
          <input type="text" placeholder="Full Name" />

          <label>Card number</label>
          <input type="text" placeholder="Placeholder" />

          <div className="row">
            <div>
              <label>Expiry</label>
              <input type="text" />
            </div>
            <div>
              <label>CVV</label>
              <input type="text" />
            </div>
          </div>

          <label>Email address</label>
          <input type="email" placeholder="hello@example.com" />

          <label>Country</label>
          <select>
            <option>Select one...</option>
          </select>
          
          <label>Street address</label>
          <input type="text" />

          <div className="row">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State / Province" />
            <input type="text" placeholder="ZIP / Postal Code" />
          </div>

          <input
                    id="reçu"
                    type="file"
                    accept=".pdf"
                    //ref={fileInputRef}
                    onChange={handleReçuChange}
              />

           <div className="form-buttons">
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="pay">Pay</button>
          </div>
  */}