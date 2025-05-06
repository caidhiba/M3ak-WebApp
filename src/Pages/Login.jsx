import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../Styles/Login.css'; 
import Header from "../Components/Header/Header"; 
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => { 
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    //console.log('Login submitted:', formData); 
    setError('');
    try {
      console.log('Form data:', formData); // Log the form data
      const result = await login(formData.email, formData.password); // fait login avec le context
      console.log('Login result:', result); // Log the login result
      if (result.success) {
        navigate('/');
        console.log('Login submitted:', formData); 
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError(err?.detail || 'An unexpected error occurred');
    }
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
                  {error && <p className="text-red-500">{error}</p>}
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