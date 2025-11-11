import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../presentación/pages/Login";
import DashboardPrinc from "../presentación/pages/DashboardPrinc";
import HistorialMov from "./pages/HistorialMov";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/DashboardPrinc" element={<DashboardPrinc />} />
      <Route path="/HistorialMov" element={<HistorialMov />} />
      <Route path="/Reportes" element={<Reportes />} />
    </Routes>
  );
}

export default App;
