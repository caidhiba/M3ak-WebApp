import React, { useState, useEffect } from 'react'; 
import '../Styles/SignIn.css'; 
 
const SignIn = () => { 
const [userType, setUserType] = useState('client'); 
const [formData, setFormData] = useState({ 
email: '', 
name: '', 
password: '', 
confirmPassword: '', 
birthDate: '', 
gender: '', 
experience: '', 
specialty: '' 
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
 
const handleSendCode = () => { 
if (!formData.email) { 
alert('Please enter your email address first'); 
return; 
} 
 
console.log('Sending code to:', formData.email); 
alert(`Verification code sent to ${formData.email}`); 
}; 
 
return ( 
<div className="sign-in-container"> 
<div className="form-side"> 
<div className="logo"> 
<img src="/src/assets/dark-logo.webp" alt="Logo" /> 
</div> 
 
<div className="content-wrapper"> 
<h2 className="page-title">Sign Up</h2> 
 
<div className="user-types"> 
<div 
className={`user-type-option ${userType === 'client' ? 'selected' : ''}`} 
onClick={() => setUserType('client')} 
> 
<span className="user-type-number">1</span> 
<span className="user-type-label">Client</span> 
</div> 
<div 
className={`user-type-option ${userType === 'therapist' ? 'selected' : ''}`} 
onClick={() => setUserType('therapist')} 
> 
<span className="user-type-number">2</span> 
<span className="user-type-label">Therapist</span> 
</div> 
</div> 
 
<form className="sign-up-form" onSubmit={handleSubmit}> 
<input 
type="email" 
name="email" 
placeholder="Email" 
className="input-field" 
value={formData.email} 
onChange={handleChange} 
required 
/> 
 
<input 
type="text" 
name="name" 
placeholder="Name" 
className="input-field" 
value={formData.name} 
onChange={handleChange} 
required 
/> 
 
<div className="password-container"> 
<input 
type="password" 
name="password" 
placeholder="Password" 
className="input-field" 
value={formData.password} 
onChange={handleChange} 
onFocus={() => setShowPasswordRules(true)} 
onBlur={() => setShowPasswordRules(false)} 
required 
/> 
{showPasswordRules && ( 
<ul className="password-strength"> 
<li className={passwordStrength.length ? 'valid' : ''}>Minimum 8 caractères</li> 
<li className={passwordStrength.uppercase ? 'valid' : ''}>Une majuscule</li> 
<li className={passwordStrength.lowercase ? 'valid' : ''}>Une minuscule</li> 
<li className={passwordStrength.number ? 'valid' : ''}>Un chiffre</li> 
<li className={passwordStrength.special ? 'valid' : ''}>Un caractère spécial</li> 
</ul> 
)} 
</div> 
 
<div className="password-container"> 
<input 
type="password" 
name="confirmPassword" 
placeholder="Confirmer le mot de passe" 
className={`input-field ${passwordError ? 'error' : ''}`} 
value={formData.confirmPassword} 
onChange={handleChange} 
onBlur={validatePasswords} 
required 
/> 
{passwordError && <div className="password-feedback">{passwordError}</div>} 
</div> 
 
<input 
type="date" 
name="birthDate" 
placeholder="Date de naissance" 
className="input-field" 
value={formData.birthDate} 
onChange={handleChange} 
required 
/> 
 
<select 
className="input-field" 
name="gender" 
value={formData.gender} 
onChange={handleChange} 
required 
> 
<option value="" disabled>Genre</option> 
<option value="male">Male</option> 
<option value="female">Female</option> 
<option value="other">Other</option> 
</select> 
 
{userType === 'therapist' && ( 
<div className="therapist-fields"> 
<input 
type="text" 
name="experience" 
placeholder="Années d'expérience" 
className="input-field" 
value={formData.experience} 
onChange={handleChange} 
required 
/> 
 
<select 
className="input-field" 
name="specialty" 
value={formData.specialty} 
onChange={handleChange} 
required 
> 
<option value="" disabled>Spécialité</option> 
<option value="psychology">Psychology</option> 
<option value="psychiatry">Psychiatry</option> 
<option value="counseling">Counseling</option> 
</select> 
</div> 
)} 
 
<button 
type="button" 
className="send-code-btn full-width" 
onClick={handleSendCode} 
> 
Send Code 
</button> 
 
<button type="submit" className="sign-up-btn"> 
Sign up 
</button> 
</form> 
 
<div className="divider"></div> 
 
<div className="login-link"> 
Already have an account? <a href="/login">Log In</a> 
</div> 
</div> 
 
<div className="footer"> 
© 2025 
</div> 
</div> 
 
<div className="image-side"> 
<img 
src="/src/assets/signIn.png" 
alt="signIn photo" 
className="hero-image" 
/> 
</div> 
</div> 
); 
}; 
 
export default SignIn; 