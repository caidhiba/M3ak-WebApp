 import './Header.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

export default function Header(){
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return(
        
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="dark-logo-holder">
                <img src={scrolled ? "/src/assets/dark-logo.webp" : "/src/assets/light-logo.png"}  alt="logo dark" />
                <span className="logo-text">M3ak</span>
            </div>
            <div className="header-elements">
                <Link to="/therapists-list" className="header-element">Therapists List</Link>
                <span className="header-element">Find A Therapist</span>
                <span className="header-element">Contact</span>
                <span className="header-element">Business</span>
                <Link to="/BookShop" className="header-element">Shop books</Link>
                <button className="Login-button">Log In</button>
                <button className="Signin-button">Sign In</button>
            </div>
               
           
        </header>

    )
}

// import { useState, useEffect } from "react";
// import "./Header.css"; // Import the CSS file

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className={`header ${scrolled ? "scrolled" : ""}`}>
//       <div className="header-container">
//         {/* Logo */}
//         <div className="logo">
//           <img
//             src={scrolled ? "/logo-dark.png" : "/logo-light.png"} 
//             alt="Logo"
//           />
//         </div>

//         {/* Navigation */}
//         <nav className="nav-links">
//           <a href="#">Therapists List</a>
//           <a href="#">Find A Therapist</a>
//           <a href="#">Contact</a>
//           <a href="#">Business</a>
//           <a href="#">Shop books</a>
//         </nav>

//         {/* Buttons */}
//         <div className="auth-buttons">
//           <button className="login">Log In</button>
//           <button className="sign-in">Sign In</button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
