import React from "react";
import "../styles/home.css";

export default function Card({ title, description, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
