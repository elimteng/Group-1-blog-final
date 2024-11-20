import React, { useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreatePost = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add API call or further submission logic here
  };

  return (
    <Layout>
      <PageHeader
        title="Creation Time"
        subtitle="Let the flow of the words sliding through your vein"
        backgroundImage="/static/img/write.jpeg"
      />

      <div className="container position-relative px-4 px-lg-5">
        <div className="d-flex justify-content-end mb-4">
          <a href="/logout" className="btn btn-link">Log Out</a>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              className="form-control form-control-lg"
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subtitle Field */}
          <div className="mb-3">
            <label htmlFor="subtitle" className="form-label">Subtitle:</label>
            <input
              className="form-control form-control-lg"
              type="text"
              name="subtitle"
              id="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />
          </div>

          {/* Content Field with CKEditor */}
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content:</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-primary" type="submit">Post</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
