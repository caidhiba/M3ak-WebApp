

// import React from "react";
// import '../Styles/PaymentPage.css';
// import cardImage from "../assets/visa-card.png"; // make sure the path is correct

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

//           <div className="form-buttons">
//             <button type="button" className="cancel">Cancel</button>
//             <button type="submit" className="pay">Pay</button>
//           </div>
//         </form>
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
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;


import React from "react";
import '../Styles/PaymentPage.css';
import cardImage from "../assets/visa-card.png"; // make sure the path is correct

const PaymentPage = ({ role }) => {
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
        </form>

        {/* Show buttons here only if role is not therapist */}
        {role !== "therapist" && (
          <div className="form-buttons">
            <button type="button" className="cancel">Cancel</button>
            <button type="submit" className="pay">Pay</button>
          </div>
        )}
      </div>

      {/* Right side: image + plan */}
      <div className="side-section">
        <img src={cardImage} alt="Card" className="card-image" />

        {role === "therapist" && (
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

            {/* Buttons appear here only for therapist */}
            <div className="form-buttons">
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="pay">Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
