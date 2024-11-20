import React from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Layout>
      <PageHeader
        title="Weifan's Blog"
        subtitle="A Blog About Life and Code"
        backgroundImage="/static/img/vechicle.jpg"
      />
      
      <section className="container">
        <p>Welcome to my blog! Explore and enjoy.</p>
      </section>
      {/* Footer Section */}
      <Footer />
    </Layout>
  );
};

export default Home;
