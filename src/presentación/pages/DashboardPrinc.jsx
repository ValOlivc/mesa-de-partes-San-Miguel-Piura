import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../Styles/DashboardPrinc.css";
import TarjetRes from "../components/TarjetasResumen";
import { FaEye, FaEllipsisH } from "react-icons/fa";
import DetalleDocumento from "../components/DetalleDocumento";
import DetalleFinal from "../components/DetalleFinal";
import { listenTramites} from "../../core/services/tramitesService";
import BarraBusqueda from "../components/BarraBusqueda";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../data/Firebase/firebaseConfig";

const DashboardPrinc = () => {
  const [documentos, setDocumentos] = useState([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalActivo, setModalActivo] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ordenFechaAsc, setOrdenFechaAsc] = useState(true);

  //Sidebar
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  //Cambios a en tramites a tiempo real
  useEffect(() => {
    const unsubscribe = listenTramites((data) => {
      setDocumentos(data);
      setDocumentosFiltrados(data);
    });
    return () => unsubscribe();
  }, []);

  // Función para registrar movimiento en Firestore
  const registrarMovimiento = async (accion, doc, observaciones = "") => {
    try {
      const usuario = auth.currentUser?.email || "Usuario desconocido";
      await addDoc(collection(db, "historial"), {
        accion,
        usuario,
        fecha: serverTimestamp(),
        tramite: doc?.id || null,
        estado: doc?.estado || null,
        prioridad: doc?.prioridad || null,
        areaAsignada: doc?.areaAsignada || null,
        expediente: doc?.nExpediente || doc?.expediente || null,
        observaciones,
      });
    } catch (err) {
      console.error("Error al registrar movimiento:", err);
    }
  };
  //Ordenar documentos por fecha
  const ordenarPorFecha = (lista) => {
    return [...lista].sort((a, b) => {
      const fechaA = new Date(a?.datosFUT?.fecha || "1970-01-01");
      const fechaB = new Date(b?.datosFUT?.fecha || "1970-01-01");
      return ordenFechaAsc ? fechaA - fechaB : fechaB - fechaA;
    });
  };
  const handleOrdenarFecha = () => setOrdenFechaAsc(!ordenFechaAsc);
  //Actualiza documento y registra movimito
  const handleActualizarDocumento = async (docActualizado, accion, observaciones) => {
    
    setDocumentos((prev) =>
      prev.map((d) => (d.id === docActualizado.id ? docActualizado : d))
    );
    setDocumentosFiltrados((prev) =>
      prev.map((d) => (d.id === docActualizado.id ? docActualizado : d))
    );
    await registrarMovimiento(accion, docActualizado, observaciones);
  };
  //Abre y cirre modales
  const abrirModal = (tipo, doc) => {
    setSelectedDoc(doc);
    setModalActivo(tipo);
  };

  const cerrarModal = () => {
    setModalActivo(null);
    setSelectedDoc(null);
  };
  //Filtra y ordena documentos visibles
  const documentosVisibles = useMemo(() => {
    const filtrados = documentosFiltrados.filter((doc) => {
      return filtroEstado === "Todos" || doc.estado === filtroEstado;
    });
    return ordenarPorFecha(filtrados);
  }, [documentosFiltrados, filtroEstado, ordenFechaAsc]);
  return (
    <div className="dashboard-container">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <main className="dashboard-content">
        <TarjetRes />
        <section className="filters-section">
          <BarraBusqueda documentos={documentos} onFiltrar={setDocumentosFiltrados} />
          <select
            className="status-filter"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aceptado">Aceptado</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </section>
        <section className="table-section">
          <table className="doc-table">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>TIPO DE DOCUMENTO</th>
                <th onClick={handleOrdenarFecha} style={{ cursor: "pointer" }}>
                  FECHA {ordenFechaAsc ? "▲" : "▼"}
                </th>
                <th>PRIORIDAD</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {documentosVisibles.map((doc) => {
                const fut = doc.datosFUT || {};
                return (
                  <tr key={doc.id}>
                    <td>SM-{doc.id || "—"}</td>
                    <td>
                      {doc.tipoTramite || "—"}
                      <p className="obs">{doc.mensaje ? `Observaciones: ${doc.mensaje}` : ""}</p>
                      <p className="exp">{doc.nExpediente ? `Expediente: ${doc.nExpediente}` : ""}</p>
                      <p className="exp">{doc.areaAsignada ? `Área: ${doc.areaAsignada}` : ""}</p>
                    </td>
                    <td>{fut.fecha || "—"}</td>
                    <td>
                      <span className={`tag ${(doc.prioridad || "Asignar").toLowerCase().replace(/\s+/g, "-")}`}>
                        {doc.prioridad || "Asignar"}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${(doc.estado || "Pendiente").toLowerCase().replace(/\s+/g, "-")}`}>
                        {doc.estado || "Pendiente"}
                      </span>
                    </td>
                    <td className="actions">
                      {doc.estado !== "Rechazado" && doc.estado !== "Aceptado" && (
                        <button className="view-btn" onClick={() => abrirModal("detalle", doc)}>
                          <FaEye className="view-icon" /> Ver
                        </button>
                      )}
                      {doc.estado !== "Pendiente" && (
                        <button className="btn-opciones" onClick={() => abrirModal("detalleFinal", doc)}>
                          <FaEllipsisH className="menu-icon" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
      {modalActivo === "detalle" && selectedDoc && (
        <DetalleDocumento
          documento={selectedDoc}
          onClose={cerrarModal}
          onActualizarEstado={(docActualizado, accion = "actualizacion_documento", observaciones = "") =>
            handleActualizarDocumento(docActualizado, accion, observaciones)
          }
        />
      )}
      {modalActivo === "detalleFinal" && selectedDoc && (
        <DetalleFinal
          documento={selectedDoc}
          onClose={cerrarModal}
          onActualizarEstado={(docActualizado, accion = "actualizacion_documento", observaciones = "") =>
            handleActualizarDocumento(docActualizado, accion, observaciones)
          }
        />
      )}
    </div>
  );
};
export default DashboardPrinc;
