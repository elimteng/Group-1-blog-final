import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchGuestbookEntries, postNewGuestbookEntry } from '../api/api'; // Assuming the methods are in api.js
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';

const GuestbookPage = () => {
  const [entries, setEntries] = useState([]); // State to store guestbook entries
  const [newEntry, setNewEntry] = useState(''); // State to store the new entry content
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle any error

  // Fetch guestbook entries when the page loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await fetchGuestbookEntries();
        setEntries(data); // Set the entries in the state
      } catch (err) {
        console.error("Error fetching guestbook entries:", err);
        setError('Failed to load guestbook entries.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchEntries(); // Call the function to fetch entries
  }, []);

  // Handle the change in the new entry text area
  const handleEntryChange = (e) => {
    setNewEntry(e.target.value);
  };

  // Handle the form submission to post a new entry
  const handlePostEntry = async (e) => {
    e.preventDefault();
    if (!newEntry) {
      alert('Please enter a message.');
      return;
    }

    try {
      // Post the new entry and add it to the entries list
      const newEntryData = await postNewGuestbookEntry(newEntry);
      setEntries([newEntryData, ...entries]); // Add the new entry at the top
      setNewEntry(''); // Clear the input field after posting
    } catch (err) {
      console.error("Error posting new entry:", err);
      setError('Failed to post your message.');
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Welcome!"
        subtitle={<Link to="/login" class = "text-white"> Click Here To Log In</Link>}
        backgroundImage="/static/img/antique.jpeg"
        
      />
        
        <div className="container">
          <h1>Guestbook</h1>
          {/* Show error message if there is an error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form to post a new message */}
          <div className="mb-4">
            <h3>Sign the Guestbook</h3>
            <form onSubmit={handlePostEntry}>
              <textarea
                value={newEntry}
                onChange={handleEntryChange}
                rows="4"
                className="form-control"
                placeholder="Write your message here..."
              />
              <button type="submit" className="btn btn-primary mt-2">
                Post Message
              </button>
            </form>
          </div>

          {/* Loading State */}
          {loading ? (
            <p>Loading guestbook entries...</p>
          ) : (
            <div>
              <h3>Guestbook Entries</h3>
              {/* Show no entries message if the guestbook is empty */}
              {entries.length === 0 ? (
                <p>No messages posted yet. Be the first to leave a message!</p>
              ) : (
                <div>
                  {entries.map((entry) => (
                    <div key={entry._id} className="entry-item border-bottom py-2">
                      <p>{entry.content}</p>
                      <small className="text-muted">
                        Posted on {new Date(entry.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <Footer />
    </Layout>
  );
};

export default GuestbookPage;
