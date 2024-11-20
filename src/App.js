import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blogs from "./components/Blogs";
import Contact from "./Pages/Contact";
import WritePost from "./Pages/WritePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/WritePost" element={<WritePost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:id" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
