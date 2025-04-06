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
        <span className="header-element">Therapists List</span>
        <span className="header-element">Find A Therapist</span>
        <span className="header-element">Contact</span>
        <span className="header-element">Business</span>
        <span className="header-element">Shop books</span>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="auth-buttons">
        <button className="Login-button">Log In</button>
        <button className="Signin-button">Sign In</button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen ? (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <span className="mobile-menu-item">Therapists List</span>
          <span className="mobile-menu-item">Find A Therapist</span>
          <span className="mobile-menu-item">Contact</span>
          <span className="mobile-menu-item">Business</span>
          <span className="mobile-menu-item">Shop books</span>
          <button className="Login-button">Log In</button>
          <button className="Signin-button">Sign In</button>
        </div>
      ) : null}
    </header>
  );
}

