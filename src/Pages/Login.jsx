import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Login.css';
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
    <div className="login-page">
      <Header />
      
      <div className="login-content">
        <div className="login-container">

          {/* Left side - Login Form */}
          <div className="login-form-container">
            <div className="login-form-wrapper">
              
              <div className="form-container">
                <h2 className="login-title">Log In</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="forgot-password">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                  
                  <button type="submit" className="login-button">
                    Log In
                  </button>
                </form>
                
                <div className="divider">
                  <span>Or</span>
                </div>
                
                <div className="signup-link">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="image-container">
            <img
              src="/src/assets/logIn.png"
              alt="Login illustration"
              className="cover-image"
            />
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Login;