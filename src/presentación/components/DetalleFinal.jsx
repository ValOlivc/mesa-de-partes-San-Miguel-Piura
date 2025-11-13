// src/pages/DetalleDocumento.jsx
import React from "react";
import "../Styles/DetalleFinal.css";
import {
  FaTimes,
  FaEnvelope,
  FaFileAlt,
  FaCalendarAlt,
  FaPhone,
  FaUserCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

const DetalleDocumento = ({ documento, onClose }) => {
  if (!documento) return null;

  const fut = documento.datosFUT || {};

  // ✅ Normalizamos el estado para clases CSS
  const estado = documento.estado || "En proceso";
  const expediente = documento.nExpediente || "Sin asignar";
  const estadoClase = estado.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Encabezado */}
        <div className="modal-header">
          <h2>Detalle Final del Documento</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Contenido */}
        <div className="modal-content">
          <div className="info-box">
            <p>
              <FaFileAlt /> <strong>Código:</strong> {documento.uid}
            </p>
            <p>
              <FaEnvelope /> <strong>Correo:</strong> {documento.email}
            </p>
            <p>
              <FaUserCircle /> <strong>DNI:</strong> {fut.dni}
            </p>
            <p>
              <FaPhone /> <strong>Teléfono:</strong> {fut.telefono}
            </p>
            <p>
              <FaMapMarkerAlt /> <strong>Domicilio:</strong> {fut.domicilio}
            </p>
            <p>
              <FaCalendarAlt /> <strong>Fecha de Solicitud:</strong> {fut.fecha}
            </p>
          </div>

          <div className="tipoDoc">
            <h4>Tipo de Documento</h4>
            <p>{documento.tipoTramite}</p>
          </div>

          <div className="estado">
            <h4>Estado del Documento</h4>
            <span className={`estado-tag ${estadoClase}`}>{estado}</span>
          </div>

          <div className="estado">
            <h4>N° Expediente</h4>
            <span className={`estado-tag ${estadoClase}`}>{expediente}</span>
          </div>

          {/* Mostrar información según el estado */}
          {estado.toLowerCase() === "rechazado" && (
            <div className="observacion">
              <h4>Motivo del Rechazo</h4>
              <p>{documento.mensaje || "Sin observación registrada."}</p>
            </div>
          )}

          {estado.toLowerCase() === "aceptado" && (
            <div className="asignacion">
              <h4>Área de Derivación</h4>
              <p>{documento.areaAsignada || "Área no especificada."}</p>
            </div>
          )}

          <div className="descripcion">
            <h4>Descripción</h4>
            <textarea type="text" value={fut.fundamentos || ""} readOnly />
          </div>

          <div className="adjuntos">
            <h4>Documentos Adjuntos</h4>

            {Object.entries(documento)
              .filter(([key, value]) => key.toLowerCase().includes("url") && value)
              .map(([key, url], index) => {
                const nombreLimpio = key
                  .replace(/url/gi, "")
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim();

                return (
                  <div key={index} className="adjunto-card">
                    <div className="adjunto-header">
                      <h5>{nombreLimpio}</h5>
                      <button
                        className="btn-ver-pdf"
                        onClick={() => window.open(url, "_blank")}
                      >
                        Ver PDF
                      </button>
                    </div>
                    <div className="adjunto-box">
                      <iframe src={url} title={nombreLimpio}></iframe>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleDocumento;
