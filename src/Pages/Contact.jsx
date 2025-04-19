import React from 'react'  
import '../Styles/Contact.css'  
import Header from "../Components/Header/Header"  
import Footer from "../Components/Footer/Footer"

const Contact = () => {  
  return (  
    <div className="contact-page-wrapper">  
      <Header />  
      <div className="contact-container">  
        <div className="contact-content">  
          {/* Left side: Contact information */}  
          <div className="contact-info">  
            <h1 className="contact-title">Contact us</h1>  
            <p className="contact-subtitle">Our friendly team would love to hear from you.</p>  
            <div className="contact-details">  
              <p>📧 TherapyDZ@gmail.com</p>  
              <p>📞 +216554088761</p>  
              <p>📍 123 Sample St, Sydney NSW 2000 AU</p>  
            </div>  
          </div>  
          {/* Right side: Contact form */}  
          <div className="contact-form-wrapper">
           <h1 className="contact-form-title">Contact us</h1>  
            <form className="contact-form">  
              <div className="contact-form-row">  
                <div className="contact-form-group">  
                  <label>First name</label>  
                  <input type="text" className="contact-input-field" />  
                </div>  
                <div className="contact-form-group">  
                  <label>Last name</label>  
                  <input type="text" className="contact-input-field" />  
                </div>  
              </div>  
              <div className="contact-form-row">  
                <div className="contact-form-group">  
                  <label>Email</label>  
                  <input type="email" className="contact-input-field" />  
                </div>  
                <div className="contact-form-group">  
                  <label>Phone number</label>  
                  <input type="tel" className="contact-input-field" />  
                </div>  
              </div>  
              <div className="contact-form-group">  
                <label>Choose a topic</label>  
                <select className="contact-input-field">  
                  <option>Select one...</option>  
                </select>  
              </div>  
              <div className="contact-form-group">  
                <label>Message</label>  
                <textarea className="contact-textarea-field"></textarea>  
              </div>  
              <div className="contact-terms">  
                <input type="checkbox" id="terms" />  
                <label htmlFor="terms">  
                  I accept the <a href="#">Terms</a>  
                </label>  
              </div>  
              <button type="submit" className="contact-submit-button">Submit</button>  
            </form>  
            {/* Mobile contact info - shows only on mobile */}
            <div className="mobile-contact-info">
              <p>Our friendly team would love to hear from you.</p>
              <p>📧 TherapyDZ@gmail.com</p>  
              <p>📞 +216554088761</p>  
              <p>📍 123 Sample St, Sydney NSW 2000 AU</p>
            </div>
          </div>  
        </div>  
      </div>  
      <Footer />  
    </div>  
  );  
};  

export default Contact;