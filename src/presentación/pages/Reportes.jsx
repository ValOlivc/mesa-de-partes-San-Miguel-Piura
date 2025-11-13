import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TarjetRes from "../components/TarjetasResumen";
import "../Styles/Reportes.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { listenTramites } from "../../core/services/tramitesService";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];

const Reportes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tramites, setTramites] = useState([]);
  const [filtroTiempo, setFiltroTiempo] = useState("7d"); // "7d" | "1m" | "1y"

  // ✅ Control del Sidebar
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  // ✅ Escucha en tiempo real de documentos desde Firebase
  useEffect(() => {
    const unsubscribe = listenTramites((docs) => {
      setTramites(docs);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Convierte la fecha del documento a tipo Date
  const parseFecha = (doc) => {
    const f = doc?.fechaCreacion ?? doc?.datosFUT?.fecha ?? doc?.fecha;
    if (!f) return null;

    if (typeof f === "object" && typeof f.toDate === "function") {
      return f.toDate();
    }

    const d = new Date(f);
    return isNaN(d) ? null : d;
  };

  // ✅ Genera un rango de fechas según el filtro
  const generarFechas = (tipo) => {
    const hoy = new Date();
    let inicio;
    let dias = [];

    if (tipo === "7d") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(hoy);
        d.setDate(hoy.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString(undefined, { weekday: "short" });
        dias.push({ key, label, date: d });
      }
    } else if (tipo === "1m") {
      inicio = new Date(hoy);
      inicio.setMonth(hoy.getMonth() - 1);
      while (inicio <= hoy) {
        const key = inicio.toISOString().slice(0, 10);
        const label = inicio.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
        dias.push({ key, label, date: new Date(inicio) });
        inicio.setDate(inicio.getDate() + 1);
      }
    } else if (tipo === "1y") {
      inicio = new Date(hoy);
      inicio.setFullYear(hoy.getFullYear() - 1);
      for (let i = 0; i < 12; i++) {
        const d = new Date(inicio);
        d.setMonth(inicio.getMonth() + i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const label = d.toLocaleDateString(undefined, { month: "short" });
        dias.push({ key, label, date: d });
      }
    }

    return dias;
  };

  // ✅ Dataset para gráfico de tendencia (línea)
  const tendenciaData = useMemo(() => {
    const fechas = generarFechas(filtroTiempo);
    const mapa = Object.fromEntries(fechas.map((d) => [d.key, 0]));

    tramites.forEach((t) => {
      const fecha = parseFecha(t);
      if (!fecha) return;

      if (filtroTiempo === "1y") {
        const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
        if (key in mapa) mapa[key]++;
      } else {
        const key = fecha.toISOString().slice(0, 10);
        if (key in mapa) mapa[key]++;
      }
    });

    return fechas.map((d) => ({ dia: d.label, documentos: mapa[d.key] }));
  }, [tramites, filtroTiempo]);

  // ✅ Dataset para gráfico de tipos (pastel)
  const tiposData = useMemo(() => {
    const counts = {};
    tramites.forEach((t) => {
      const tipo = (t.tipoTramite || "Sin tipo").trim();
      counts[tipo] = (counts[tipo] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tramites]);

  return (
    <div className="reports-page">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main className="reports-content">
        {/* Encabezado */}
        <div className="reports-header">
          <h2>Reportes del Sistema</h2>
          <p>Resumen general y análisis de documentos en tiempo real.</p>
        </div>

        {/* Tarjetas resumen */}
        <TarjetRes />

        {/* Sección de gráficos */}
        <div className="charts-section">
          {/* Tendencia temporal */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Tendencia de Documentos</h3>
              <select
                className="filtro-tiempo"
                value={filtroTiempo}
                onChange={(e) => setFiltroTiempo(e.target.value)}
              >
                <option value="7d">Últimos 7 días</option>
                <option value="1m">Último mes</option>
                <option value="1y">Último año</option>
              </select>
            </div>
            <p className="chart-subtitle">
              {filtroTiempo === "7d"
                ? "Últimos 7 días"
                : filtroTiempo === "1m"
                ? "Último mes"
                : "Último año"}
            </p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={tendenciaData}>
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="documentos"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tipos de documentos */}
          <div className="chart-card">
            <h3>Tipos de Documentos Más Frecuentes</h3>
            <p className="chart-subtitle">Distribución por categoría</p>
            <div className="chart-container pie">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tiposData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {tiposData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reportes;
