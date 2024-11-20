import React, { useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { createPost } from "../api/api"; // API function to handle post creation
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WritePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

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
  
    // Validate that all fields are filled
    if (!formData.title.trim() || !formData.subtitle.trim() || !formData.content.trim()) {
      alert("All fields (Title, Subtitle, and Content) are required.");
      return;
    }
  
    try {
      const newPost = await createPost(formData);
      console.log("Post created:", newPost);
      setFormData({ title: "", subtitle: "", content: "" });
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };
  

  return (
    <Layout>
      <PageHeader
        title="Creation Time"
        subtitle="Let the flow of the words sliding through your vein"
        backgroundImage="/static/img/write.jpeg"
      />

      <div className="container mt-5" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-end mb-3">
          <a href="/logout" className="btn btn-outline-secondary">Log Out</a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-light p-5 rounded shadow-lg"
          style={{
            width: "100%",
          }}
        >
          {/* Title and Subtitle Fields */}
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

          {/* Content Field with CKEditor */}
          <div className="mb-4">
            <label htmlFor="content" className="form-label">Content:</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
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
