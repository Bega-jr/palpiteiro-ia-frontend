import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import "../styles/layout.css";

export default function MainLayout() {
  return (
    <div className="layout-container">
      <Header />

      <div className="layout-content">
        <Sidebar />
        
        <main className="layout-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
