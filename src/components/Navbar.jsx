// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ logoUrl }) => {
  return (
    <nav className="w-full h-16 bg-white shadow flex items-center px-6 justify-between">

      {/* Área do logo — substitua quando tiver a imagem */}
      <div className="flex items-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        ) : (
          <div className="h-10 w-32 bg-gray-200 rounded-md opacity-40" />
        )}
      </div>

      {/* Conteúdo à direita */}
      <div className="flex items-center gap-4">
        {/* Aqui você coloca seus menus, usuário, ícones etc */}
      </div>
    </nav>
  );
};

export default Navbar;
