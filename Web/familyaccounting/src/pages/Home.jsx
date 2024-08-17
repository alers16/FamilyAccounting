import React, { useState } from "react";
import "./Home.css"; // Asegúrate de importar tu archivo CSS

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      console.log("Archivo arrastrado:", file);
    }
  };

  return (
    <main
      className="container-fluid px-0"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="drag-overlay">
          <h2>Arrastra aquí</h2>
        </div>
      )}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="row m-4 d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-12 flex-col m-5">
            <h1 className="h1">
              Realiza automáticamente las cuentas de tu familia
            </h1>
            <span className="text-secondary">Fácil, rápido y asequible</span>
          </div>
          <div
            className="col-md-5 col-12 bg-light shadow p-3 d-flex justify-content-center align-items-center"
            style={{
              border: "2px",
              borderRadius: "15px",
              height: "40vh",
            }}
          >
            <div className="row d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary"
                style={{ height: "20%", width: "60%" }}
              >
                <span style={{ fontSize: "150%" }}>Seleccionar Excel</span>
              </button>
              <span className="text-secondary text-center mt-3">
                O arrastra el archivo a la página
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
