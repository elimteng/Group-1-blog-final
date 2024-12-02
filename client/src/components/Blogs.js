import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import PageHeader from "./PageHeader";
import { fetchSinglePost, updatePost } from "../api/api";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Blogs = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Toggle for edit mode
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [errors, setErrors] = useState({}); // Track validation errors

  // Load the blog when the component mounts
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchSinglePost(id);
        setBlog(data);
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          content: data.content,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  // Handle form changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
    }));
  };

  // Handle CKEditor changes
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });
    setErrors((prevErrors) => ({
      ...prevErrors,
      content: data.trim() ? "" : "Content is required.",
    }));
  };

  // Validate the form fields before saving
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required.";
    if (!formData.content.trim()) newErrors.content = "Content is required.";
    return newErrors;
  };

  // Save the updated blog
  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const updatedBlog = await updatePost(id, formData);
      setBlog(updatedBlog); // Update the local state with the saved data
      setEditMode(false); // Exit edit mode
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    setFormData({ title: blog.title, subtitle: blog.subtitle, content: blog.content }); // Reset to original data
    setEditMode(false);
  };

  return (
    <Layout>
      {loading ? (
        <p>Loading blog...</p>
      ) : blog ? (
        <>
          {/* Edit Mode */}
          {editMode ? (
            <>
              <PageHeader
                title="Edit Blog"
                subtitle="Modify your content"
                backgroundImage="/static/img/antique.jpeg"
              />
              <section className="container mt-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    {errors.title && <p className="text-danger">{errors.title}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subtitle" className="form-label">Subtitle:</label>
                    <input
                      type="text"
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    {errors.subtitle && <p className="text-danger">{errors.subtitle}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.content}
                      onChange={handleEditorChange}
                    />
                    {errors.content && <p className="text-danger">{errors.content}</p>}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </section>
            </>
          ) : (
            // View Mode
            <>
              <PageHeader
                title={blog.title}
                subtitle={blog.subtitle}
                backgroundImage="/static/img/read.jpeg"
              />
              <section className="container mt-4">
                <p className="text-muted">{new Date(blog.createdAt).toLocaleString()}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <div className="text-end mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Blog
                  </button>
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <p>Blog not found</p>
      )}
    </Layout>
  );
};

export default Blogs;
