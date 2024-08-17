import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/financial-accounting-logo-creative-finance-logo-vector-removebg-preview.png";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="d-flex align-items-center">
              <img src={logo} alt="FamilyAccountings logo" height={70} />
              <span className="text-secondary">
                <strong>FamilyAccounting</strong>
              </span>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
