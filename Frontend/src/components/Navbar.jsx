
import { Link } from 'react-router-dom';
import logo from '../assets/srijon.jpeg'
import { useState } from 'react';
import "./Navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="left-nav">
          <p className="logo">YT Fetch</p>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li> <Link to="/login">Login again</Link></li>
            <li><Link to="/Music">Music Downloader</Link></li>
            <li><Link to="/Video">Video Downloader</Link></li>
          </ul>
        </div>

        <div className="right-nav">
          <img src={logo} alt="Profile" />
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${isOpen ? 'rotate1' : ''}`}></div>
            <div className={`bar ${isOpen ? 'hide' : ''}`}></div>
            <div className={`bar ${isOpen ? 'rotate2' : ''}`}></div>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Navbar