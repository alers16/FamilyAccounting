import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import Loading from "./Loading";
import { MenuItem, Select } from "@mui/material";
import * as XLSX from "xlsx";
import { X } from "@mui/icons-material";
import "./Formulario.css";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, path } = location.state || {};
  const [python, setPython] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [pathPdf, setPathPdf] = useState("");
  const [mes, setMes] = useState("");
  const [extra, setExtra] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadDotPulse = async () => {
      await import("ldrs/dotPulse");
    };
    loadDotPulse();
    console.log("Ruta del archivo:", path);
    const fileBuffer = window.ipcRenderer.readFile(path);
    console.log("Buffer del archivo:", fileBuffer);
    if (fileBuffer) {
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      console.log("Nombres de las hojas:", sheetNames);
      setSheetNames(sheetNames);
      setSelectedSheet(sheetNames[0]);
    }
  }, [path]);

  const validate = () => {
    const newErrors = {};

    if (!mes) {
      newErrors.mes = "Debe seleccionar un mes";
    }

    if (!selectedSheet) {
      newErrors.selectedSheet = "Debe seleccionar una hoja";
    }

    if (!pathPdf) {
      newErrors.pathPdf = "Debe seleccionar un archivo PDF";
    }

    if (!extra || isNaN(extra)) {
      newErrors.extra =
        "Debe ingresar un valor numérico para el campo Extra Añadido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const months = [
    { label: "Enero", value: "ENERO" },
    { label: "Febrero", value: "FEBRERO" },
    { label: "Marzo", value: "MARZO" },
    { label: "Abril", value: "ABRIL" },
    { label: "Mayo", value: "MAYO" },
    { label: "Junio", value: "JUNIO" },
    { label: "Julio", value: "JULIO" },
    { label: "Agosto", value: "AGOSTO" },
    { label: "Septiembre", value: "SEPTIEMBRE" },
    { label: "Octubre", value: "OCTUBRE" },
    { label: "Noviembre", value: "NOVIEMBRE" },
    { label: "Diciembre", value: "DICIEMBRE" },
  ];

  const onChanchehandler = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".pdf")) {
      setFileName(file.name);
      setFileType(file.type);
      window.ipcRenderer.saveFilePath(file.path);
      setPathPdf(file.path);
      console.log("Archivo seleccionado:", file);
    } else {
      alert("Solo se permiten archivos de PDF (.pdf)");
    }
  };

  const onProcess = async () => {
    if (!validate()) {
      return;
    }
    setPython(true);
    try {
      const result = await window.ipcRenderer.runPython(
        "main.py",
        `pdf=${pathPdf}`,
        `excel=${path}`,
        `mes=${mes}`,
        `extra=${extra}`,
        `hoja=${selectedSheet}`
      );
      setPython(false);
      document.getElementById("modalButton").click();
      console.log("Resultado del script de Python:", result);
    } catch (error) {
      console.error("Error ejecutando el script de Python:", error);
    }
  };

  const handleOpenFile = () => {
    if (path) {
      window.ipcRenderer.openFile(path);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith(".pdf")) {
      setFileName(file.name);
      setFileType(file.type);
      window.ipcRenderer.saveFilePath(file.path);
      setPathPdf(file.path);
      console.log("Archivo arrastrado:", file);
    } else {
      alert("Solo se permiten archivos de PDF (.pdf)");
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="modalOk"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                ¡Completado!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              La introducción de datos del archivo <strong>{name}</strong> ha
              sido completada con éxito. ¿Qué quieres hacer a continuación?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Volver
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleOpenFile}
              >
                Abrir Archivo
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container d-flex align-items-start justify-content-start">
        <button
          type="button"
          id="modalButton"
          data-bs-toggle="modal"
          data-bs-target="#modalOk"
          style={{ display: "none" }}
        ></button>
        <div className="mt-5 mx-5">
          <button
            type="button"
            className="btn btn-securndary "
            style={{ backgroundColor: "#f0f0f0", color: "black" }}
            onClick={() => {
              navigate("/", {});
            }}
          >
            Volver
          </button>
        </div>
        <div className="card m-4" style={{ maxWidth: "70%", maxHeight: "10%" }}>
          <div className="row">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="col mb-3 d-flex  align-items-center">
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/768px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png"
                    }
                    className="me-4"
                    alt="Icono del archivo"
                    style={{ maxWidth: "6%" }}
                  />
                  <h4 className="h4 me-auto">{name}</h4>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={selectedSheet}
                  label="Nombre de la hoja"
                  onChange={(e) => setSelectedSheet(e.target.value)}
                  error={!!errors.selectedSheet}
                  helperText={errors.selectedSheet}
                >
                  {sheetNames.map((sheetName, index) => (
                    <MenuItem key={index} value={sheetName}>
                      {sheetName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={months}
                  onChange={(event, newValue) =>
                    setMes(newValue ? newValue.value : null)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mes"
                      error={!!errors.mes}
                      helperText={errors.mes}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">
                  {" "}
                  Selecciona el archivo pdf
                </FormLabel>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={onChanchehandler}
                  style={{ display: "none" }}
                  id="fileInput"
                ></input>
                <div
                  className={`col-md-5 col-12 bg-light shadow p-3 d-flex justify-content-center align-items-center`}
                  style={{
                    border: "2px",
                    borderRadius: "15px",
                    height: "20vh",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    document.getElementById("fileInput").click();
                  }}
                  onDrop={handleDrop}
                >
                  {fileName ? (
                    <>
                      <img
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/400px-PDF_file_icon.svg.png"
                        }
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
                    </>
                  ) : (
                    <>
                      <CloudUploadIcon
                        className="download-icon"
                        style={{ fontSize: 70 }}
                        color="gray"
                        sx={{ mr: 2 }}
                      />
                      <span className="text-secondary download">
                        Arrastra el archivo aquí o haz click para seleccionarlo
                      </span>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Extra Añadido"
                  onChange={(e) => {
                    setExtra(e.target.value);
                  }}
                  error={!!errors.extra}
                  helperText={errors.extra}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <button className="btn btn-primary btn-lg" onClick={onProcess}>
                  {python ? (
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    <>Comenzar</>
                  )}
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
    </>
  );
}
