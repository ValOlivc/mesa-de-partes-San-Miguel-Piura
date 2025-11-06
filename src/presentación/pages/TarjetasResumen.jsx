import React from "react";
import "../Styles/Header.css";
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle} from "react-icons/fa";

const TarjetRes = () => {
  return (
    <div>
        <section className="summary-cards">
            <div className="card">
            <div className="card-info">
                <p>Total Documentos</p>
                <h2>1,284</h2>
            </div>
            <FaFileAlt className="card-icon blue" />
            </div>

            <div className="card">
            <div className="card-info">
                <p>Pendientes</p>
                <h2>48</h2>
            </div>
            <FaClock className="card-icon orange" />
            </div>

            <div className="card">
            <div className="card-info">
                <p>Aceptados</p>
                <h2>1,127</h2>
            </div>
            <FaCheckCircle className="card-icon green" />
            </div>

            <div className="card">
            <div className="card-info">
                <p>Rechazados</p>
                <h2>109</h2>
            </div>
            <FaTimesCircle className="card-icon red" />
            </div>
        </section>
        
    </div>
  );
};

export default TarjetRes;