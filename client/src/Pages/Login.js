import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data; // Destructure the response
    if (!user || !token) {
      throw new Error("Malformed response from server.");
    }

    // Store the token in localStorage (or sessionStorage)
    localStorage.setItem("token", token);

    // Call the context login function with user data
    login(user);

    // Clear any previous errors
    setError("");
    window.location.assign("/");
    
  } catch (err) {
    console.error("Login error:", err.response || err.message); // Log for debugging
    setError("Invalid credentials."); // Show error message to the user
  }
};



  return (
    <Layout>
  <PageHeader
    title="Log In"
    subtitle={<Link to="/guessbook" class = "text-white"> Wanna Go Back To Guess Book? Click Here</Link>}
    backgroundImage="/static/img/bently.jpeg"
  />

  <section className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-6">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h3 className="text-center mb-4 fw-bold">Login</h3>
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg text-uppercase fw-bold"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-decoration-none fw-bold">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</Layout>

  );
};

export default Login;
