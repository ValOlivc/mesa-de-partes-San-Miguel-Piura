import React, { useState } from "react";
import "../Styles/ModalRechazo.css";

const ModalRechazo = ({ documento, onClose, onConfirm }) => {
  const [observacion, setObservacion] = useState("");
  const [error, setError] = useState("");

  const handleConfirmar = () => {
    if(observacion.trim() === ""){
      setError("Debe ingresar una observación antes de confirmar.");
      return;
    }
    setError("");
    onConfirm(observacion);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-rechazo">
        <div className="modal-header">
          <h2>Rechazar Documento</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="mensaje">
          Está a punto de rechazar el documento{" "}
          <strong>{documento.codigo}</strong>. Por favor, indique el motivo del rechazo.
        </p>

        <label>Observación</label>
        <textarea
          placeholder="Ej: Documentación incompleta, falta documentación ..."
          value={observacion}
          onChange={(e) => setObservacion(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}

        <div className="acciones-modal">
          <button className="cancelar-btn" onClick={onClose}>Cancelar</button>
          <button className="confirmar-btn" onClick={handleConfirmar}>Confirmar Rechazo</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRechazo;
