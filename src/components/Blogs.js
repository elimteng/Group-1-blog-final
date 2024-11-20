import React from "react";
import Layout from "./Layout";

const Blogs = () => {
  const posts = [
    { id: 1, title: "The Beauty of React", summary: "Discover why React is so powerful." },
    { id: 2, title: "My Coding Journey", summary: "How I fell in love with programming." },
  ];

  return (
    <Layout>
      <section style={{ padding: "20px" }}>
        <h1>Blogs</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "10px" }}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <a href={`/blogs/${post.id}`}>Read more</a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Blogs;
