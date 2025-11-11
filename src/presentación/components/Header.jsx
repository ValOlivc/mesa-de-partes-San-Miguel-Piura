// src/components/Header.jsx
import React from "react";
import "../Styles/Header.css";
import logo from "../../assets/logo-san-miguel.jpg";
import { FaBars } from "react-icons/fa";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Logo San Miguel" className="header-logo" />
        <div className="divider" />
        <div className="header-text">
          <h1>SAN MIGUEL</h1>
          <p>
            Sistema de Gestión Documental <br /> Mesa de Partes
          </p>
        </div>

        {/* Botón de menú */}
        <button className="sidebar-deployment" onClick={onToggleSidebar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
