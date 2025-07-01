import React from 'react'
import srijonimage from "../assets/srijon sikkim .jpeg"
import "./Navbar.css"

const Navbar = () => {
  return (
   <div className="navbar-wrapper">
  <nav className="navbar">
    <div className="left-nav">
      <p>YT Fetch</p>
    </div>
    <div className="right-nav">
      <img src={srijonimage} alt="Profile" />
    </div>
  </nav>
</div>

  )
}

export default Navbar