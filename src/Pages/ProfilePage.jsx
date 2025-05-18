
import '../styles/profilePage.css';
import { useState } from "react";
import ChatApp from './ChatApp'
import Appointments from './Appointments';
import Orders from './Orders';

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  return (
    <div className="profile-container">
      
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActiveSection("profile")}>Account</li>
          <li onClick={() => setActiveSection("appointments")}>Appointments</li>
          <li onClick={() => setActiveSection("messages")}>Messages</li>
          <li onClick={() => setActiveSection("documents")}>Documents</li>
          <li onClick={() => setActiveSection("Orders")}>Orders</li>
        </ul>
      </aside>
      <main className="profile-main">
       <div className="profile-banner">
          <img src="src/assets/signIn.png" alt="Profile Header" className="banner-img" />
        </div>
        <div className="profile-header">
          <img className="profile-pic" src="/src/assets/author.png" alt="profile" />
          <div className="user-info">
            <h2>Name Surname</h2>
            <p>hello@usurname.io</p>
          </div>
        </div>

        {activeSection === "profile" && (
        <section className="personal-info">
          <h3>Personal information</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <form>
            <div className="form-row">
              <input placeholder="First name" />
              <input placeholder="Last name" />
            </div>
            <input placeholder="Email address" />
            <select><option>Select one...</option></select>
            <input placeholder="Street address" />
            <div className="form-row">
              <input placeholder="City" />
              <input placeholder="State / Province" />
              <input placeholder="ZIP / Postal code" />
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </section>
        )}
        {activeSection === "appointments" && (
          <section className="appointments-section">
           <Appointments />
          </section>
        )}
        {activeSection === "messages" && (
  <section className="messages-section">
    <ChatApp />
  </section>
        )}
        {activeSection === "Orders" && (
  <section className="commandes-section">
   <Orders />
  </section>
          )}
      </main>
    </div>
  );
}
