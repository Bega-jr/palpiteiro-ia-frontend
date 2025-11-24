import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <span className="logo">Palpiteiro IA</span>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/gerador">Gerador</Link>
        <Link to="/contato">Contato</Link>
      </nav>
    </header>
  );
}
