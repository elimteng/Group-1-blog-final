import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchSinglePost, updatePost } from "../api/api";

const Blog = ({ blog, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: blog.title,
    subtitle: blog.subtitle,
    content: "", // Initially empty, fetch when entering edit mode
  });
  const [errors, setErrors] = useState({});
  const [loadingContent, setLoadingContent] = useState(false);

  // Fetch the full blog content when entering edit mode
  const fetchContentForEdit = async () => {
    setLoadingContent(true);
    try {
      const fullBlog = await fetchSinglePost(blog._id); // Fetch full blog details
      setFormData({
        title: fullBlog.title,
        subtitle: fullBlog.subtitle,
        content: fullBlog.content,
      });
    } catch (error) {
      console.error("Error fetching full blog content:", error);
      alert("Failed to load blog content for editing.");
    } finally {
      setLoadingContent(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required.";
    if (!formData.content.trim()) newErrors.content = "Content is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : prevErrors[name],
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, content: data });

    // Clear content error as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      content: data.trim() ? "" : prevErrors.content,
    }));
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedBlog = await updatePost(blog._id, formData);
      if (onEdit) {
        onEdit(updatedBlog); // Use onEdit instead of onEditComplete
      }
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: blog.title,
      subtitle: blog.subtitle,
      content: "", // Reset to empty; will be fetched again if re-entering edit mode
    });
    setEditMode(false);
  };

  const enterEditMode = () => {
    if (!formData.content) {
      // Fetch content if not already available
      fetchContentForEdit();
    }
    setEditMode(true);
  };

  const handleDelete = () => {
    onDelete(blog._id); // Call the parent component's delete handler
    };

  return (
    <div className="blog-item border-bottom py-3">
      {editMode ? (
        loadingContent ? (
          <p>Loading content...</p>
        ) : (
          <form>
            {/* Title Field */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
              />
              {errors.title && <p className="text-danger">{errors.title}</p>}
            </div>

            {/* Subtitle Field */}
            <div className="mb-3">
              <label htmlFor="subtitle" className="form-label">Subtitle:</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="form-control"
              />
              {errors.subtitle && <p className="text-danger">{errors.subtitle}</p>}
            </div>

            {/* Content Field */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content:</label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
                onChange={handleEditorChange}
              />
              {errors.content && <p className="text-danger">{errors.content}</p>}
            </div>

            {/* Save and Cancel Buttons */}
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )
      ) : (
        <>
          {/* Blog Display */}
          <h3>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </h3>
          <p className="text-muted">{blog.subtitle}</p>
          <p className="small text-muted">Created on: {new Date(blog.createdAt).toLocaleString()}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Edit and Delete Buttons */}
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary btn-sm" onClick={enterEditMode}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
