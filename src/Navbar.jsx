import React from "react";
import { Link } from "react-router-dom"; 
import logo from "./assets/dicelogo.png";

export default function Navbar() {
  return (
    <nav
      className="nav"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <a href="/" className="sitename">
        <img
          src={logo}
          alt="Dice Logo"
          width="120"
          height="50"
          style={{ objectFit: "contain" }}
          className="logo"
        />
      </a>

      {/* Navigation Links */}
      <ul style={{ listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: 0 }}>
        <li>
          {/* Internal link to Whyproject page */}
          <Link to="/why-project" className="contact-button">
            Creator
          </Link>
        </li>
      </ul>
    </nav>
  );
}
