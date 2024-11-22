import React from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer"; //reusable Footer
import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <Layout>
      {/* Header Section */}
      <PageHeader
        title="About Byte Odyssey"
        subtitle="Every Huge Leap Starts with a Small Step"
        backgroundImage="/static/img/computer.jpg"
      />

      {/* Main Content */}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <h1>Welcome To The Byte Odyssey</h1>
              <p>
              This blog is a journey through the world of coding and life,
               crafted as a platform to share ideas, stories, and insights. 
               Combining modern web development practices with an expressive design, 
               the blog reflects both individual's technical growth and creative expression. 
               It serves as a space where technology meets storytelling, 
               with each post representing a blend of personal experiences and 
               professional explorations.
              </p>

              <p>
              The project is built using React for the frontend, MongoDB for the backend, 
              and a structured, scalable architecture. 
              The blog features a dynamic interface that allows users to create, edit, 
              and view posts seamlessly. With robust features like real-time validation, 
              a rich-text editor, and a responsive design, 
              the platform ensures a smooth and engaging user experience. 
              It showcases how modern tools and frameworks can be leveraged to build 
              a functional yet aesthetic digital product.
              </p>

              <p>
              Beyond its technical capabilities, 
              this blog is a space for meaningful content. 
              From sharing coding tips to reflections on personal growth, 
              each post is designed to resonate with readers and spark discussions. 
              It is not just a technical project but also a platform 
              that encourages creativity, learning, and connection. 
              I hope this blog inspires others to explore the intersection of technology 
              and storytelling, and We look forward to sharing this journey with you!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </Layout>
  );
};

export default About;
