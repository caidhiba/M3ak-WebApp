import React, { useState, useEffect, useRef, useContext  } from 'react'; 
import { Link } from 'react-router-dom';  
import '../Styles/SignIn.css'; 
import Header from "../Components/Header/Header"; 

import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {  
  const [formData, setFormData] = useState({ 
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    code: '',
    sexe: '' ,
    birthDate: ''
  }); 
  const [passwordError, setPasswordError] = useState(''); 
  const [passwordStrength, setPasswordStrength] = useState({ 
    length: false, 
    uppercase: false, 
    lowercase: false, 
    number: false, 
    special: false 
  }); 
  const [showPasswordRules, setShowPasswordRules] = useState(false); 
  
  const [verifiedEmail, setVerifiedEmail] = useState(""); // Stocke l'email validé
  const [expiresAt, setExpiresAt] = useState(null); // conserne le code de vérification
  const [timeLeft, setTimeLeft] = useState(0);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData({ 
      ...formData, 
      [name]: value 
    }); 
  }; 
  
  useEffect(() => { 
    const { password } = formData; 
    setPasswordStrength({ 
      length: password.length >= 8, 
      uppercase: /[A-Z]/.test(password), 
      lowercase: /[a-z]/.test(password), 
      number: /[0-9]/.test(password), 
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password) 
    }); 
  }, [formData.password]); 
  
  
  // 🔁 Timer qui met à jour le temps restant toutes les secondes
  useEffect(() => {
    let timer;

    if (expiresAt) {
      timer = setInterval(() => {
        const now = new Date();
        const expires = new Date(expiresAt);
        const secondsLeft = Math.floor((expires - now) / 1000);

        if (secondsLeft <= 0) {
          clearInterval(timer);
          setTimeLeft(0);// Temps expiré
          setExpiresAt(null); // Réactive le bouton
        } else {
          setTimeLeft(secondsLeft);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [expiresAt]);


  const validatePasswords = () => { 
    const { password, confirmPassword } = formData; 
    if (confirmPassword && password !== confirmPassword) { 
      setPasswordError("Passwords don't match"); 
      return false; 
    } else { 
      setPasswordError(''); 
      return true; 
    } 
  }; 
  const validateBirthDate = (birthDate) => {
    if (!birthDate) {
      alert("Veuillez entrer votre date de naissance.");
      return false;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear = (
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
    );
    const realAge = hasHadBirthdayThisYear ? age : age - 1;

    if (realAge < 13) {
      alert("Vous devez avoir au moins 13 ans pour vous inscrire.");
      return false;
    }

    return true;
  };

  const handleSubmit =async(e) => { 
    e.preventDefault(); 
    const { email, password, confirmPassword, code, firstName, lastName, sexe,birthDate } = formData;//, sexe,birthDate
    if (!validateBirthDate(birthDate)) return;
    if (!validatePasswords()) return; 
    const { length, uppercase, lowercase, number, special } = passwordStrength; 
    if (!(length && uppercase && lowercase && number && special)) { 
      setPasswordError('Password does not meet all requirements'); 
      return; 
    } else{
        if (email !== verifiedEmail) {
            alert("L'email ne correspond pas à celui utilisé pour recevoir le code.");
            return;
          }else{
             const response = await register(email, firstName, lastName, password,code,sexe,birthDate);//,sexe,birthDate
             console.log('Inscription réussie:', response); // Log the response data
             if (response.success) {
               alert(response.data.message);
               navigate('/'); // Rediriger vers la page de connexion après l'inscription réussie           
             }else {
                alert(response.data.error?.non_field_errors?.[0] || response.data.error || "Erreur inconnue");
             }
           }  
    }
    console.log('Form submitted:', formData); 
  }; 



  const sendVerificationCode = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/GestionAccounts/send-code/", { email: formData.email });
      //setIsCodeSent(true);
      setVerifiedEmail(formData.email); // L'email devient celui qui est validé par le code
      // Récupérer le message et expires_at depuis la réponse
      const { message, expires_at } = response.data;
      //alert("Code envoyé avec succès. Vérifiez votre email.");
      
      setExpiresAt(new Date(expires_at)); // Convertir en objet Date
      alert(`${message}\nCe code expirera à : ${new Date(expires_at).toLocaleString()}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
        if (axios.isAxiosError(error)) {
            // Vérifier l'erreur du backend et afficher le message approprié
            if (error.response && error.response.data && error.response.data.non_field_errors) {
              alert(error.response.data.non_field_errors[0]); // Affiche le message d'erreur
            } else {
              alert("Erreur lors de l'envoi du code.");
            }
          } else {
            alert("Une erreur inconnue s'est produite.");
          }
    }
  };
  
  return ( 
    <div className="signup-page-wrapper"> 
      <Header />
      <div className="signup-page-content"> 
        <div className="signup-page-container"> 
          {/* Left side - Form */} 
          <div className="signup-page-form-side"> 
            <div className="signup-page-content-wrapper"> 
              <h2 className="signup-page-title">Sign Up</h2> 
              <form className="signup-page-form" onSubmit={handleSubmit}> 
                <div className="signup-page-form-group"> 
                  <label>Email</label> 
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    className="signup-page-input-field" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  /> 
                </div> 
                <div className="signup-page-form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="signup-page-input-field"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup-page-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="signup-page-input-field"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
               <div className="signup-page-form-group">
                  <label>Sexe</label>
                  <select
                    name="sexe"
                    className="signup-page-input-field"
                    value={formData.sexe}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez votre sexe</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>
                
                <div className="signup-page-form-group">
                  <label>Date de naissance</label>
                  <input
                    type="date"
                    name="birthDate"
                    className="signup-page-input-field"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="signup-page-form-group signup-page-password-container"> 
                  <label>Password</label> 
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Create a password" 
                    className="signup-page-input-field" 
                    value={formData.password} 
                    onChange={handleChange} 
                    onFocus={() => setShowPasswordRules(true)} 
                    onBlur={() => setShowPasswordRules(false)} 
                    required 
                  /> 
                  {showPasswordRules && ( 
                    <ul className="signup-page-password-strength"> 
                      <li className={passwordStrength.length ? 'valid' : ''}>Minimum 8 characters</li> 
                      <li className={passwordStrength.uppercase ? 'valid' : ''}>At least one uppercase letter</li> 
                      <li className={passwordStrength.lowercase ? 'valid' : ''}>At least one lowercase letter</li> 
                      <li className={passwordStrength.number ? 'valid' : ''}>At least one number</li> 
                      <li className={passwordStrength.special ? 'valid' : ''}>At least one special character</li> 
                    </ul> 
                  )} 
                </div> 
                <div className="signup-page-form-group signup-page-password-container"> 
                  <label>Confirm Password</label> 
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm your password" 
                    className={`signup-page-input-field ${passwordError ? 'error' : ''}`} 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    onBlur={validatePasswords} 
                    required 
                  /> 
                  {passwordError && <div className="signup-page-password-feedback">{passwordError}</div>} 
                </div> 
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="signup-page-form-group">
                  <label>Verification Code</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter the code"
                    className="signup-page-input-field"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/*!isCodeSent && (*/}
                    <button
                      type="button"
                      className="signup-page-btn"
                      onClick={sendVerificationCode}
                      disabled={timeLeft > 0} // désactiver si le code n’est pas encore expiré
                    >
                       {timeLeft > 0 ? `Réessayez dans ${timeLeft}s` : "Envoyer le code"}
                    </button>
                 {/* )*/}
                </div>

                <button type="submit" className="signup-page-btn"> 
                  Sign Up 
                </button> 
              </form> 
              <div className="signup-page-divider"></div> 
              <div className="signup-page-login-link"> 
                Already have an account? <Link to="/login">Log In</Link> 
              </div> 
            </div> 
          </div> 
          {/* Right side - Image */} 
          <div className="signup-page-image-side"> 
            <img 
              src="/src/assets/signIn.png" 
              alt="Sign up illustration" 
              className="signup-page-hero-image" 
            /> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default SignIn;