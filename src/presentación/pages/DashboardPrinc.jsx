import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../Styles/DashboardPrinc.css";
import TarjetRes from "../pages/TarjetasResumen";
import { FaEye, FaEllipsisH, FaFilter } from "react-icons/fa";
import DetalleDocumento from "../components/DetalleDocumento";
import ModalRechazo from "../components/ModalRechazo";

// 🧩 Importamos las funciones del servicio
import { listenTramites, updateTramite } from "../../core/services/tramitesService";

const DashboardPrinc = () => {
  const [documentos, setDocumentos] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [mostrarRechazo, setMostrarRechazo] = useState(false);

  // 🔥 Escucha cambios en Firestore en tiempo real
  useEffect(() => {
    const unsubscribe = listenTramites(setDocumentos);
    return () => unsubscribe();
  }, []);

  // 🔴 Rechazar documento (y actualizar Firestore)
  const handleConfirmar = async (observacionTexto) => {
    if (selectedDoc) {
      await updateTramite(selectedDoc.id, {
        estado: "Rechazado",
        observacion: observacionTexto || "",
      });
    }
    setMostrarRechazo(false);
    setSelectedDoc(null);
  };

  const handleAbrirRechazo = (doc) => {
    setSelectedDoc(doc);
    setMostrarRechazo(true);
  };

  return (
    <div className="dashboard-container">
      <Header />

      <main className="dashboard-content">
        <TarjetRes />

        <section className="filters-section">
          <div className="search-container">
            <input type="text" placeholder="Busca por código, fecha ..." />
            <button className="filter-btn">
              <FaFilter />
            </button>
          </div>
          <select className="status-filter">
            <option>Todos los estados</option>
          </select>
        </section>

        <section className="table-section">
          <div className="table-header">
            <p>{documentos.length} documentos</p>
          </div>

          <table className="doc-table">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>TIPO DE DOCUMENTO</th>
                <th>FECHA</th>
                <th>PRIORIDAD</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {documentos.map((doc) => {
                const fut = doc.datosFUT || {};
                return (
                  <tr key={doc.id}>
                    <td>{doc.uid || "—"}</td>
                    <td>{doc.tipoTramite || "—"}</td>
                    <td>{fut.fecha || "—"}</td>
                    <td>
                      <span className="tag alta">Alta</span>
                    </td>
                    <td>
                      <span
                        className={`status ${
                          (doc.estado || "Pendiente").toLowerCase()
                        }`}
                      >
                        {doc.estado || "Pendiente"}
                      </span>
                    </td>
                    <td className="actions">
                      {doc.estado !== "Rechazado" && (
                        <button
                          className="view-btn"
                          onClick={() => setSelectedDoc(doc)}
                        >
                          <FaEye className="view-icon" /> Ver
                        </button>
                      )}
                      <button
                        className="btn-opciones"
                        onClick={() => handleAbrirRechazo(doc)}
                      >
                        <FaEllipsisH className="menu-icon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal Detalle */}
      {selectedDoc && !mostrarRechazo && (
        <DetalleDocumento
          documento={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}

      {/* Modal Rechazo */}
      {mostrarRechazo && (
        <ModalRechazo
          documento={selectedDoc}
          onClose={() => setMostrarRechazo(false)}
          onConfirm={handleConfirmar}
        />
      )}
    </div>
  );
};

export default DashboardPrinc;
