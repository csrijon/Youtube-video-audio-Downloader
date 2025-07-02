import React from 'react'
import srijonimage from "../assets/srijon sikkim .jpeg"
import  { useState } from 'react';
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
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div className="right-nav">
          <img src={srijonimage} alt="Profile" />
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