import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import "../App.css"; // Global CSS file

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
