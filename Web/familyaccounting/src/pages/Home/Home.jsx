import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      setFileName(file.name);
      setFileType(file.type);
      console.log("Archivo arrastrado:", file);
      console.log("Tipo de archivo:", file.type);
    } else {
      alert("Solo se permiten archivos de Excel (.xlsx, .xls)");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      setFileName(file.name);
      setFileType(file.type);
      console.log("Archivo seleccionado:", file);
    } else {
      alert("Solo se permiten archivos de Excel (.xlsx, .xls)");
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/768px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png";
      case "application/vnd.ms-excel":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/768px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"; // URL del icono de Excel
      case "application/pdf":
        return "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"; // URL del icono de PDF
      // Añade más casos según sea necesario
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/8/89/File.svg"; // URL del icono genérico
    }
  };

  useEffect(() => {
    const handleWindowDragLeave = (event) => {
      if (
        event.clientX <= 0 ||
        event.clientY <= 0 ||
        event.clientX >= window.innerWidth ||
        event.clientY >= window.innerHeight
      ) {
        setIsDragging(false);
      }
    };

    document.addEventListener("dragleave", handleWindowDragLeave);

    return () => {
      document.removeEventListener("dragleave", handleWindowDragLeave);
    };
  }, []);

  return (
    <main
      className="container-fluid px-0"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="drag-overlay">
          <h2>Suelta el archivo en cualquier lado de la pagina</h2>
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
            className={`col-md-5 col-12 bg-light shadow p-3 d-flex justify-content-center ${
              fileName ? "align-items-start" : "align-items-center"
            }`}
            style={{
              border: "2px",
              borderRadius: "15px",
              height: "40vh",
            }}
          >
            <div className="row d-flex justify-content-center align-items-center">
              {fileName === "" ? (
                <>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  <button
                    className="btn btn-primary"
                    style={{ height: "20%", width: "60%" }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <span style={{ fontSize: "150%" }}>Seleccionar Excel</span>
                  </button>
                  <span className="text-secondary text-center mt-3">
                    O arrastra el archivo a la página
                  </span>
                </>
              ) : (
                <div className="m">
                  <div className="card mr-auto">
                    <div className="card-body d-flex align-items-center">
                      <img
                        src={getFileIcon(fileType)}
                        className="me-4"
                        alt="Icono del archivo"
                        style={{ maxWidth: "13%" }}
                      />
                      <span className="me-auto">{fileName}</span>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          setFileName("");
                          setFileType("");
                        }}
                      ></button>
                    </div>
                  </div>
                  <div className="m-3 ">
                    <div className="row m-3">
                      <strong>Si este es tu archivo pulse el botón:</strong>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => {
                          navigate("/form", {
                            state: { name: fileName, type: fileType },
                          });
                        }}
                      >
                        <span style={{ fontSize: "120%" }}>Procesar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
