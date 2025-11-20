// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import "../Styles/Sidebar.css";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../data/Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import logo from "../../assets/logo-san-miguel.jpg"

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Datos del usuario (rol, permisos, etc.)

  // Obtener datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.warn("No se encontró información del usuario");
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Cerrar sesión y registrar en historial
  const handleLogout = async () => {
    const user = auth.currentUser;

    try {
      if (user) {
        await addDoc(collection(db, "historial"), {
          accion: "cierre de sesion",
          usuario: user.email || "Usuario desconocido",
          fecha: serverTimestamp(),
          tramite: null,
          estado: null,
          prioridad: null,
          areaAsignada: null,
          expediente: null,
          observaciones: "El usuario cerró sesión",
        });
      }

      await signOut(auth);

      navigate("/", { replace: true });
      window.history.pushState(null, "", "/");
      window.onpopstate = () => navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al registrar o cerrar sesión:", error);
    }
  };

  // Definir menú con roles permitidos
  const menuItems = [
    { label: "Inicio", path: "/DashboardPrinc", roles: ["admin", "usuario"] },
    { label: "Reportes", path: "/Reportes", roles: ["admin"] },
    { label: "Historial", path: "/HistorialMov", roles: ["admin", "usuario"] },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="Logo">
          <img src={logo} alt="Logo San Miguel" className="logo" />
        </div>
        <div className="Logo-nombre">
          <h3>Mesa de Partes - San Miguel</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map(item => (
          item.roles.includes(userData?.rol) && (
            <li key={item.path}>
              <Link to={item.path} onClick={onClose}>{item.label}</Link>
            </li>
          )
        ))}
      </ul>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
