import React, { useState } from "react";
import "../Styles/ModalAsignarArea.css";
import { FaTimes } from "react-icons/fa";

const ModalAsignarArea = ({ onClose, onGuardar }) => {
  const [area, setArea] = useState("");

  const handleGuardar = () => {
    if (!area) {
      alert("Por favor seleccione un área.");
      return;
    }
    onGuardar(area);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Asignar Área</h3>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="modal-content">
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="area-select"
          >
            <option value="">Seleccione un área</option>
            <option value="Secretaría">Secretaría</option>
            <option value="Archivo">Archivo</option>
            <option value="Logística">Logística</option>
            <option value="Dirección">Dirección</option>
            <option value="Contabilidad">Contabilidad</option>
          </select>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button className="btn-guardar" onClick={handleGuardar}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAsignarArea;
