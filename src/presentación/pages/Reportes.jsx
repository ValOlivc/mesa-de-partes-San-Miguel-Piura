import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const Reportes = () => {
    // 🔹 NUEVO: estado para el sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 🔹 Funciones para abrir/cerrar
    const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleCloseSidebar = () => setIsSidebarOpen(false);
    return (
        <div>
            <Header onToggleSidebar={handleToggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        </div>
    )
};
export default Reportes