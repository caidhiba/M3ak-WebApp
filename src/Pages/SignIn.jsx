import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';  
import '../Styles/SignIn.css'; 
import Header from "../Components/Header/Header"; 
 
const SignIn = () => {  
  const [formData, setFormData] = useState({ 
    email: '', 
    name: '', 
    password: '', 
    confirmPassword: '', 
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
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!validatePasswords()) return; 
    const { length, uppercase, lowercase, number, special } = passwordStrength; 
    if (!(length && uppercase && lowercase && number && special)) { 
      setPasswordError('Password does not meet all requirements'); 
      return; 
    } 
    console.log('Form submitted:', formData); 
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
                  <label>Full Name</label> 
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your full name" 
                    className="signup-page-input-field" 
                    value={formData.name} 
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