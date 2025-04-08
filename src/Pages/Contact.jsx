import React from 'react' 
import '../Styles/Contact.css' 
 
import Header from "../Components/Header/Header"; 
import Footer from "../Components/Footer/Footer"; 
 
const Contact = () => { 
return ( 
<div className="bg-[#D3E0C6] min-h-screen"> 
<Header /> 
<div className="contact-container"> 
<div className="contact-content"> 
    
{/* Partie gauche : Informations de contact */} 
<div className="contact-info"> 
<h1 className="contact-title">Contact us</h1> 
<p className="contact-subtitle">Our friendly team would love to hear from you.</p> 
<div className="contact-details"> 
<p>📧 TherapyDZ@gmail.com</p> 
<p>📞 +216554088761</p> 
<p>📍 123 Sample St, Sydney NSW 2000 AU</p> 
</div> 
</div> 
 
{/* Partie droite : Formulaire de contact */} 
<div className="contact-form-wrapper"> 
<form className="contact-form"> 
<div className="form-row"> 
<div className="form-group"> 
<label>First name</label> 
<input type="text" className="input-field" /> 
</div> 
<div className="form-group"> 
<label>Last name</label> 
<input type="text" className="input-field" /> 
</div> 
</div> 
 
<div className="form-row"> 
<div className="form-group"> 
<label>Email</label> 
<input type="email" className="input-field" /> 
</div> 
<div className="form-group"> 
<label>Phone number</label> 
<input type="tel" className="input-field" /> 
</div> 
</div> 
 
<div className="form-group"> 
<label>Choose a topic</label> 
<select className="input-field"> 
<option>Select one...</option> 
</select> 
</div> 
 
<div className="form-group"> 
<label>Message</label> 
<textarea className="textarea-field"></textarea> 
</div> 
 
<div className="terms"> 
<input type="checkbox" id="terms" /> 
<label htmlFor="terms"> 
I accept the <a href="#">Terms</a> 
</label> 
</div> 
 
<button type="submit" className="submit-button">Submit</button> 
</form> 
</div> 
 
</div> 
</div> 
<Footer /> 
</div> 
); 
}; 
 
export default Contact 