import React from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer"; //reusable Footer
import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <Layout>
      {/* Header Section */}
      <PageHeader
        title="About Us"
        subtitle="Every Huge Leap Starts with a Small Step"
        backgroundImage="/static/img/computer.jpg"
      />

      {/* Main Content */}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>
                My name is Weifan Li. This is my first site, specifically for
                the CS50 final project. However, I intend to continue updating
                some experimental features on this site.
              </p>

              <p>
                I have never thought that my life would turn out this way.
                Transitioning from human nutrition to computer science is not
                something trivial; it takes a lot to make this decision. I hope
                to use this site as a log and personal growth documentary.
              </p>

              <p>
                Graduating with a human nutrition major at Virginia Tech, I had
                a hard time finding my own path until computer science once
                again enlightened me. Piling up computer science knowledge into
                my conception, I shall one day row the boat ashore.
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
