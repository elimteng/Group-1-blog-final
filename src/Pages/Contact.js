import React, { useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer"; // Import the reusable Footer component
import PageHeader from "../components/PageHeader";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Simulate form submission success
    setFormStatus({ success: true, error: false });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    // Optionally handle error
    // setFormStatus({ success: false, error: true });
  };

  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        subtitle="Have questions? I have answers."
        backgroundImage="/static/img/contact-bg.jpg"
      />

      {/* Main Content */}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>
                Want to get in touch? Fill out the form below to send me a message, and I
                will get back to you as soon as possible!
              </p>
              <div className="my-5">
                {/* Contact Form */}
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name..."
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email..."
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number..."
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      placeholder="Enter your message here..."
                      style={{ height: "12rem" }}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                  <br />
                  {/* Success Message */}
                  {formStatus.success && (
                    <div className="text-center mb-3">
                      <div className="fw-bolder">Form submission successful!</div>
                      <p>Thank you for reaching out.</p>
                    </div>
                  )}
                  {/* Error Message */}
                  {formStatus.error && (
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  )}
                  {/* Submit Button */}
                  <button
                    className="btn btn-primary text-uppercase"
                    id="submitButton"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </Layout>
  );
};

export default Contact;
