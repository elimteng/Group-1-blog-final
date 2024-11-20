import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="/">BO</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/WritePost">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
