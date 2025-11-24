// src/components/Header.jsx
import React from "react";

const Header = ({ logoUrl, title }) => {
  return (
    <header className="w-full bg-gray-50 py-6 px-6 flex items-center gap-6 shadow-sm">

      {/* Logo opcional */}
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo"
          className="h-14 w-auto object-contain"
        />
      ) : (
        <div className="h-14 w-40 bg-gray-200 rounded-md opacity-40" />
      )}

      {/* Título do sistema */}
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </header>
  );
};

export default Header;
