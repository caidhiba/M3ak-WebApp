import React from "react";
import './Footer.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-top">
          <div className="newsletter">
            <h4>Join our newsletter</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="logo">
              <img src="/src/assets/light-logo.png" alt="" />
            </div>
          </div>
          
          <div className="newsletter-input">
            <div>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
            </div>
           <div>
           <small>
             By subscribing you agree to with our <a href="#">Privacy Policy</a>
            </small>
           </div>
           
          </div>
        </div>
        
        <div className="footer-bottom">
        <div className="copyright">&copy; 2024 Relume. All rights reserved.</div>
          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Settings</a>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        
      </footer>
    );
  };
  
  export default Footer;