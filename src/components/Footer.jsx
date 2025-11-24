import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} Palpiteiro IA — Todos os direitos reservados.</p>
    </footer>
  );
}
