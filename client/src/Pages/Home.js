import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import Blog from "../components/Blog";
import { fetchPosts, deletePost } from "../api/api";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Step 1: Get the user data from context
  const { user, authLoading, logout } = useAuth(); // Get user and loading state
  const navigate = useNavigate(); // Use navigate to redirect

  useEffect(() => {
    const loadBlogs = async () => {
      if (user) {
        try {
          // Step 2: Fetch posts for the logged-in user
          const data = await fetchPosts(user.id); // Fetch posts based on user.id
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching user blogs:", error);
        }
      } else {
        navigate("/login"); // Redirect to login page if not logged in
      }
      setLoading(false);
    };

    if (!authLoading) { // Only load blogs after auth check is done
      loadBlogs();
    }
  }, [user, authLoading, navigate]); // Re-run when user or authLoading changes

  const handleEdit = (updatedBlog) => {
    try {
      setBlogs((prev) =>
        prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
      );
    } catch (error) {
      console.error("Error updating blog in Home.js:", error);
      alert("Failed to update blog in Home.js.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deletePost(id);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <Layout>
      <PageHeader
        title="Bytes Odyssey"
        subtitle="A Blog Platform About Life and Code"
        backgroundImage="/static/img/vechicle.jpg"
      />
      
        <div className="d-flex justify-content-end mb-3">
          <button onClick={handleLogout} className="btn btn-outline-secondary">Log Out</button>
        </div>
        {/* <SearchBar /> */}
      <section className="container mt-4">
        {authLoading ? (
          <p>Loading authentication...</p>
        ) : loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No posts available. Create your first blog!</p>
        ) : (
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
      <Footer />
    </Layout>
  );
};

export default Home;
