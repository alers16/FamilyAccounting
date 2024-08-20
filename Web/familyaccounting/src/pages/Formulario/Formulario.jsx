import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";

export default function Form() {
  const location = useLocation();
  const { name, type } = location.state || {};
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const months = [
    { label: "Enero", value: 1 },
    { label: "Febrero", value: 2 },
    { label: "Marzo", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Mayo", value: 5 },
    { label: "Junio", value: 6 },
    { label: "Julio", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Septiembre", value: 9 },
    { label: "Octubre", value: 10 },
    { label: "Noviembre", value: 11 },
    { label: "Diciembre", value: 12 },
  ];

  const onChanchehandler = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".pdf")) {
      setFileName(file.name);
      setFileType(file.type);
      console.log("Archivo seleccionado:", file);
    } else {
      alert("Solo se permiten archivos de PDF (.pdf)");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith(".pdf")) {
      setFileName(file.name);
      setFileType(file.type);
      console.log("Archivo arrastrado:", file);
    } else {
      alert("Solo se permiten archivos de PDF (.pdf)");
    }
  };

  return (
    <main className="container d-flex align-items-center justify-content-center">
      <div className="card m-5" style={{ maxWidth: "70%" }}>
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
              <TextField fullWidth label="Nombre de la hoja" />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={months}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Mes" />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">
                {" "}
                Selecciona o arrastra el archivo pdf
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
                      style={{ fontSize: 100 }}
                      color="gray"
                      sx={{ mr: 2 }}
                    />
                    <span className="text-secondary">
                      Arrastra el archivo aquí o haz click para seleccionarlo
                    </span>
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Contraseña</FormLabel>
              <OutlinedInput fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Acepto los términos y condiciones"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
  );
}
