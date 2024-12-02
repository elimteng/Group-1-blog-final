import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { createPost } from "../api/api"; 
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "../context/AuthContext";  

const WritePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [error, setError] = useState(""); 
  const { user, logout, authLoading } = useAuth();  
  const navigate = useNavigate();  

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.subtitle.trim() || !formData.content.trim()) {
      setError("All fields (Title, Subtitle, and Content) are required.");
      return;
    }

    try {
      const newPost = await createPost(formData);
      console.log("Post created:", newPost);

      setFormData({ title: "", subtitle: "", content: "" });
      setError(""); 
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  if (authLoading) {
    return <div>Loading...</div>;  // You can display a loading indicator while auth is being checked
  }

  return (
    <Layout>
      <PageHeader
        title="Creation Time"
        subtitle="Let the flow of the words sliding through your vein"
        backgroundImage="/static/img/write.jpeg"
      />

      <div className="container mt-5" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-end mb-3">
          <button onClick={handleLogout} className="btn btn-outline-secondary">Log Out</button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-light p-5 rounded shadow-lg"
          style={{
            width: "100%",
          }}
        >
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mb-4">
            <div className="col-md-12 mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="subtitle" className="form-label">Subtitle:</label>
              <input
                className="form-control form-control-lg"
                type="text"
                name="subtitle"
                id="subtitle"
                placeholder="Enter the subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="form-label">Content:</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={handleEditorChange}
            />
          </div>

          <div className="text-end">
            <button className="btn btn-primary px-5 py-2" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default WritePost;
