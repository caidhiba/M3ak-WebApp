import './Header.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Link to="/therapists-list" className="header-element">Therapist List</Link> 
        <Link to="/FindATherapist" className="header-element">Find A Therapist</Link> 
        <Link to="/contact" className="header-element">Contact</Link> 
        <Link to="/Business" className="header-element">Business</Link> 
        <Link to="/Bookshop" className="header-element">Shop Books</Link> 
        {isTherapist && (
        <Link to="/recommendation" className="header-element">Recommendation</Link>
        )}

       
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="Login-button">Log In</Link> 
        <Link to="/signup" className="Signin-button">Sign In</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {/* {menuOpen ? (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <span className="mobile-menu-item">Therapists List</span>
          <span className="mobile-menu-item">Find A Therapist</span>
          <span className="mobile-menu-item">Contact</span>
          <span className="mobile-menu-item">Business</span>
          <span className="mobile-menu-item">Shop books</span>
          <button className="Login-button">Log In</button>
          <button className="Signin-button">Sign In</button>
        </div>
      ) : null} */}

      {/* {menuOpen && (
        <div className="mobile-sidebar">
          <button className="close-sidebar" onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
          <span className="mobile-sidebar-item">Home</span>
          <span className="mobile-sidebar-item">Therapists List <span className="badge">24</span></span>
          <span className="mobile-sidebar-item">Find A Therapist</span>
          <span className="mobile-sidebar-item">Contact</span>
          <span className="mobile-sidebar-item">Business</span>
          <span className="mobile-sidebar-item">Shop books</span>
          <span className="mobile-sidebar-item">Support</span>
          <span className="mobile-sidebar-item">Settings</span>
          <button className="Login-button">Log In</button>
          <button className="Signin-button">Sign In</button>
        </div>
      )} */}
         {menuOpen && (
          <div className="mobile-sidebar">
            <button className="close-sidebar" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>
            <Link to="/" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/therapists-list" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>
              Therapists List <span className="badge">24</span>
            </Link>
            <Link to="/FindATherapist" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Find A Therapist</Link>
            <Link to="/contact" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/Business" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Business</Link>
            <Link to="/Bookshop" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Shop books</Link>
            {isTherapist && (
            <Link to="/recommendation" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>
             Recommendation
             </Link>
            )}

            <Link to="/Support" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Support</Link>
            <Link to="/Settings" className="mobile-sidebar-item" onClick={() => setMenuOpen(false)}>Settings</Link>
            <Link to="/login" className="Login-button" onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link to="/signup" className="Signin-button" onClick={() => setMenuOpen(false)}>Sign In</Link>
          </div>
        )}


    </header>
  );
}

