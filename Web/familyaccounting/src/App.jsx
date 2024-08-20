import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Form from "./pages/Formulario/Formulario";

function App() {
  const wrap = (v) => (
    <>
      <Header />
      {v}
    </>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={wrap(<Home />)} />
          <Route path="/form" element={wrap(<Form />)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
