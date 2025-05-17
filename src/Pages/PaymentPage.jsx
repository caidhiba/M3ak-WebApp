

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
import React,{useContext } from "react";
import "../Styles/PaymentPage.css";
import { AuthContext } from '../auth/AuthContext';
import cardImage from "../assets/visa-card.png";
//import { useRole } from "../auth/RoleContext"; // ✅ Make sure path is correct

const PaymentPage = () => {
  //const { role } = useRole(); // ✅ Get role from context

   // 🗒️ le userinfo contient les informations de l'utilisateur connecté (first_name,last_name,role,user_id)  fait userinfo.role
   const {userinfo,isLoading} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur

  return (
    <div className="payment-container">
      {/* Left side: the form */}
      <div className="form-section">
        <h2>Payment method</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <form>
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
           <div className="form-buttons">
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="pay">Pay</button>
          </div>
        </form>

        {/* Show buttons here only if role is NOT therapist */}
        {!isLoading && userinfo && userinfo.role !== "therapeute" && (
          <div className="form-buttons">
            <button type="button" className="cancel">Cancel</button>
            <button type="submit" className="pay">Pay</button>
          </div>
        )}
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
