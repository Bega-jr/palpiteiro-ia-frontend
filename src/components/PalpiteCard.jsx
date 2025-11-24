import React from "react";
import "../styles/palpitecard.css";

export default function PalpiteCard({ numeros }) {
  return (
    <div className="palpite-card">
      {numeros.map((n, i) => (
        <span key={i} className="bolinha">
          {n}
        </span>
      ))}
    </div>
  );
}
