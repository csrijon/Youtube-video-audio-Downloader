import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Brand Info */}
        <div className="footer-brand">
          <h2>YT Fetch</h2>
          <p>Download YouTube videos and audio in your preferred quality, fast and free.</p>
        </div>

        {/* Navigation */}
        <div className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/download">Downloader</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YT Fetch. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
