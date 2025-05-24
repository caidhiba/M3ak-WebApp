import './Header.css'
import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
//import { useRole } from "../auth/RoleContext";

import { AuthContext } from '../../auth/AuthContext';
import NotificationBell from '../Notification/Notification';
export default function Header() {
  //const { role } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // 🗒️ le userinfo contient les informations de l'utilisateur connecté (first_name,last_name,role,user_id)
  const {userinfo ,isLoading,isAuthenticated,logout} = useContext(AuthContext); //👈✌️😉 recuperer les informations de l'utilisateur
  useEffect(() => {
    if (!isLoading ) {
      
      const handleScroll = () => {
      setScrolled(window.scrollY > 50);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
    }  
  }, [isLoading]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="dark-logo-holder">
        <img
          src={scrolled ? "/src/assets/dark-logo.webp" : "/src/assets/light-logo.png"}
          alt="logo"
        />
        <span className="logo-text">M3ak</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-links">
        <Link to="/" className="header-element">Home</Link> 
        <Link to="/therapists-list" className="header-element">Therapist List</Link> 
        <Link to="/FindATherapist" className="header-element">Find A Therapist</Link> 
        <Link to="/contact" className="header-element">Contact</Link> 
        <Link to="/Bookshop" className="header-element">Shop Books</Link> 
        {userinfo && userinfo.role === "patient" && (
             <Link to="/Business" className="header-element" onClick={() => setMenuOpen(false)}>Business</Link>
        )} 
        {userinfo && userinfo.role === "therapeute" && (
        <Link to="/recommendation" className="header-element">Recommendation</Link>
        )}
       
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="auth-buttons">
      {isLoading ? null : (
          !isAuthenticated ? (
         <>  
           <Link to="/login" className="Login-button">Log In</Link> 
           <Link to="/signup" className="Signin-button">Sign In</Link>
        </>
       ) : (
        <>
          <button onClick={logout} className="Login-button">Log Out</button>
          <NotificationBell />
          <Link to="/Profile" className="profile-link">
              <img src={`http://127.0.0.1:8000${userinfo.image}`} alt="Profile" className="profile-img" />{/**src/assets/pfp-therapist.avif */}
          </Link>
        </>
      )
      )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      

     
         {menuOpen && (
          <div className="mobile-sidebar">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            {isLoading ? null : (
               isAuthenticated ? (
                <>
                <NotificationBell />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                 <Link to="/Profile" className="profile-link">
                    <img src={`http://127.0.0.1:8000${userinfo.image}`} alt="Profile" className="profile-img" />{/**src/assets/pfp-therapist.avif */}
                 </Link>
                </div>
                </>
               ) :null
            )}
            

            <button className="close-sidebar" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>
            
          </div> 
            <Link to="/" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/therapists-list" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>
              Therapists List <span className="badge">24</span>
            </Link>
            <Link to="/FindATherapist" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Find A Therapist</Link>
            <Link to="/contact" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/Bookshop" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Shop books</Link>
            {userinfo && userinfo.role === "patient" && (
             <Link to="/Business" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Business</Link>
              )}          
            {userinfo && userinfo.role === "therapeute" && (
            <Link to="/recommendation" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>
             Recommendation
             </Link>
              )}

            <Link to="/Support" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Support</Link>
            <Link to="/Settings" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Settings</Link>
            
            {isLoading ? null : (
               !isAuthenticated ? (
                <>                
                    <Link to="/login" className="Login-button" onClick={() => setMenuOpen(false)}>Log In</Link>
                    <Link to="/signup" className="Signin-button" onClick={() => setMenuOpen(false)}>Sign In</Link>
                
                </>
            ):null
          )}
          </div>
        )}


    </header>
  );
}

