import React from 'react'; 
import '../Styles/Login.css'; 
 
const Login = () => { 
return ( 
<div className="login-container"> 
{/* Logo in corner */} 
<div className="logo"> 
<img src="/src/assets/dark-logo.webp" alt="Logo" /> 
</div> 
{/* Left side - Login Form */} 
<div className="login-form-container"> 
<div className="login-form-wrapper"> 
{/* Login Form */} 
<div className="form-container"> 
<h2 className="login-title">Log In</h2> 
<form className="login-form"> 
<input 
type="email" 
placeholder="Email" 
className="form-input" 
required 
/> 
<input 
type="password" 
placeholder="Password" 
className="form-input" 
required 
/> 
<button 
type="submit" 
className="login-button" 
> 
Log in 
</button> 
</form> 
<div className="divider"></div> 
<div className="signup-link"> 
Don't have an account? <a href="/signup">Sign In</a> 
</div> 
</div> 
{/* Copyright */} 
<div className="copyright"> 
© 2022 Relume 
</div> 
</div> 
</div> 
{/* Right side - Image */} 
<div className="image-container"> 
<img 
src="/src/assets/logIn.png" 
alt="logIn photo" 
className="cover-image" 
/> 
</div> 
</div> 
); 
}; 
 
export default Login; 