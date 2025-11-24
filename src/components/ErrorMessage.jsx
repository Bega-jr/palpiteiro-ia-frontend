import React from "react";
import "../styles/error.css";

export default function ErrorMessage({ mensagem }) {
  if (!mensagem) return null;

  return (
    <div className="error-box">
      {mensagem}
    </div>
  );
}
