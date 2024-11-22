import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import { fetchLimitedPosts, deletePost } from "../api/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchLimitedPosts();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const handleEdit = (updatedBlog) => {
    try{
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

  

  

  return (
    <Layout>
      <PageHeader
        title="Bytes Odyssey"
        subtitle="A Blog Platform About Life and Code"
        backgroundImage="/static/img/vechicle.jpg"
      />
      <section className="container mt-4">
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No posts available. Create your first blog!</p>
        ) : (
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}  // or blog={{ ...blog, content: "" }} if doesn't want to show content after edit
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
