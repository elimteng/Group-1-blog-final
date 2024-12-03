import React, { useState, useEffect } from "react";
import { fetchUserProfile } from "../api/api";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const data = await fetchUserProfile(); // Fetch current user
        setUser(data); // Set user data
      } catch (err) {
        console.error("Error fetching current user:", err.message);
        setError("Failed to load user profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Layout>
      <PageHeader
        title="Your Profile"
        subtitle="View your account details below."
        backgroundImage="/static/img/home-bg.jpg"
      />
      <div className="container mt-4 text-center">
        {user && (
          <div className="profile">
            <h2>{user.name || "No Name"}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            {user.location && <p><strong>Location:</strong> {user.location}</p>}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
