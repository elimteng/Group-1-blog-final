import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blogs from "./components/Blogs";
import Contact from "./Pages/Contact";
import WritePost from "./Pages/WritePost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; 
import GuestbookPage from "./Pages/GuestbookPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/guessbook" element={<GuestbookPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs/:id" element={<Blogs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Private Route - Requires Authentication */}
          <Route
            path="/writepost"
            element={
              <ProtectedRoute>
                <WritePost />
              </ProtectedRoute>
            }
          />
          
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
