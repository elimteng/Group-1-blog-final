import React, { useState } from "react";
import { searchPosts } from "../api/api";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token"); // Retrieve token for authentication

    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }

    try {
      const data = await searchPosts(query, token); // Call the API function
      setResults(data); // Update the results state
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Search Blog Posts</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search blogs by title or content"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="mt-4">
        {results.length === 0 && <p>No results found.</p>}
        <ul className="list-group">
          {results.map((post) => (
            <li key={post._id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.subtitle}</p>
              <p>{post.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
