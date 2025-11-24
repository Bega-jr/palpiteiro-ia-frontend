import React from "react";
import "../styles/login-layout.css";

export default function LoginLayout({ children }) {
  return (
    <div className="login-layout">
      <div className="login-card">
        {children}
      </div>
    </div>
  );
}
