import React from "react";
import "../styles/loading.css";

export default function Loading() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
}
