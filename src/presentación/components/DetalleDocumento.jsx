import { useState } from "react";
import React from "react";
import "../Styles/DetalleDocumento.css";
import ModalRechazo from "../components/ModalRechazo";
import { FaTimes, FaEnvelope, FaFileAlt, FaCalendarAlt, FaPhone, FaUserCircle,FaMapMarkerAlt } from "react-icons/fa";

const DetalleDocumento = ({ documento, onClose, onActualizarEstado }) => {
  const [mostrarRechazo, setMostrarRechazo] = useState(false);

  if (!documento) return null;

  // ✅ Función que se ejecuta al confirmar el rechazo
  const fut = documento.datosFUT || {};
  const handleConfirmar = (observacion) => {
    // Actualizamos el estado del documento y su observación
    const docActualizado = {
      ...documento,
      estado: "Rechazado",
      observacion: observacion || "", // opcional
    };

    // Notificamos al padre (DashboardPrinc) que el documento cambió
    if (onActualizarEstado) onActualizarEstado(docActualizado);

    // Cerramos ambos modales
    setMostrarRechazo(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Detalles del Documento</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <div className="doc-info">
            <div className="info-box">
              <p><FaFileAlt /> <strong>Código:</strong> {documento.uid}</p>
              <p><FaEnvelope /> <strong>Correo Electrónico:</strong> {documento.email}</p>
              <p><FaUserCircle /> <strong>DNI:</strong> {fut.dni}</p>
              <p><FaPhone /> <strong>Teléfono:</strong> {fut.telefono}</p>
              <p><FaMapMarkerAlt /> <strong>Domicilio:</strong> {fut.domicilio}</p>
              <p><FaCalendarAlt /> <strong>Fecha de Solicitud:</strong> {fut.fecha}</p>
            </div>
          </div>

          <div className="tipoDoc">
            <h4>Tipo de Documento: {documento.tipoTramite}</h4>
          </div>

          <div className="estado">
            <h4>Estado</h4>
            <span className={`estado-tag ${documento.estado.toLowerCase()}`}>
              {documento.estado}
            </span>
          </div>

          <div className="cantidadDoc">
            <h4>Cantidad de documentos</h4>
            <textarea type="text" value={fut.documentos} readOnly />
          </div>

          <div className="descripcion">
            <h4>Descripción</h4>
            <textarea type="text" value={fut.fundamentos} readOnly />
          </div>

          <div className="adjunto">
            <h4>Vaucher </h4>
            <div className="adjunto-box">
              <iframe src={documento.solicitudUrl}></iframe>
            </div>
          </div>

          <div className="adjunto">
            <h4>Solicitud </h4>
            <div className="adjunto-box">
              <iframe src={documento.solicitudUrl}></iframe>
            </div>
          </div>

          <div className="adjunto">
            <h4>DNI Remitente </h4>
            <div className="adjunto-box">
              <iframe src={documento.dniApoderadoUrl}></iframe>
            </div>
          </div>

          <div className="asignacion">
            <h4># Asignación de Documento</h4>
            <div className="asignacion-box">
              <input type="text" placeholder="N° de expediente" />
              <select>
                <option>Asignar prioridad</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </div>
          </div>

          <div className="acciones">
            <button className="btn-rechazar" onClick={() => setMostrarRechazo(true)}>
              Rechazar Documento
            </button>
            <button className="btn-aceptar">Aceptar Documento</button>
          </div>
        </div>
      </div>

      {/* ✅ Modal de rechazo */}
      {mostrarRechazo && (
        <ModalRechazo
          documento={documento}
          onClose={() => setMostrarRechazo(false)}
          onConfirm={handleConfirmar}
        />
      )}
    </div>
  );
};

export default DetalleDocumento;
