import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../Styles/Login.css'; // Renamed CSS file
import Header from "../Components/Header/Header"; 
 
const Login = () => { 
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  }); 
  
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData({ 
      ...formData, 
      [name]: value 
    }); 
  }; 
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    console.log('Login submitted:', formData); 
  }; 
 
  return ( 
    <div className="login-page-wrapper"> 
      <Header />
      <div className="login-page-content"> 
        <div className="login-page-container"> 
          {/* Left side - Login Form */} 
          <div className="login-page-form-container"> 
            <div className="login-page-form-wrapper"> 
              <div className="login-page-form-inner"> 
                <h2 className="login-page-title">Log In</h2> 
                <form className="login-page-form" onSubmit={handleSubmit}> 
                  <div className="login-page-form-group"> 
                    <label>Email</label> 
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Enter your email" 
                      className="login-page-form-input" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    /> 
                  </div> 
                  <div className="login-page-form-group"> 
                    <label>Password</label> 
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Enter your password" 
                      className="login-page-form-input" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    /> 
                  </div> 
                  <div className="login-page-forgot-password"> 
                    <Link to="/forgot-password">Forgot password?</Link> 
                  </div> 
                  <button type="submit" className="login-page-button"> 
                    Log In 
                  </button> 
                </form> 
                <div className="login-page-divider"> 
                  <span>Or</span> 
                </div> 
                <div className="login-page-signup-link"> 
                  Don't have an account? <Link to="/signup">Sign Up</Link> 
                </div> 
              </div> 
            </div> 
          </div> 
          {/* Right side - Image */} 
          <div className="login-page-image-container"> 
            <img 
              src="/src/assets/logIn.png" 
              alt="Login illustration" 
              className="login-page-cover-image" 
            /> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default Login;