const API_URL = process.env.REACT_APP_API_URL;

// Check if API_URL is defined
if (!API_URL) {
  console.error("Error: API_URL is not defined in your environment variables.");
  process.exit(1); // Exit the process with an error code
}

export const fetchPosts = async (userId = null) => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Construct the API endpoint URL
  const endpoint = `/api/posts`;
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
        "Content-Type": "application/json", // Set Content-Type header
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchPosts:", error);
    throw error;
  }
};


export const fetchLimitedPosts = async () => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/api/limited`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
        "Content-Type": "application/json", // Ensure Content-Type is set
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch limited posts: ${response.statusText}`);
    }

    return await response.json(); // Parse the JSON response
  } catch (error) {
    console.error("Error in fetchLimitedPosts:", error);
    throw error;
  }
};


export const fetchSinglePost = async (id) => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  try {
    // Use the correct _id parameter in the URL
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
        "Content-Type": "application/json", // Ensure Content-Type is set
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the blog with id ${id}: ${response.statusText}`);
    }

    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error("Error in fetchSinglePost:", error);
    throw error;
  }
};

// export const searchPosts = async (query, token) => {
//   const API_URL = process.env.REACT_APP_API_URL;

//   if (!API_URL) {
//     throw new Error("API_URL is not defined. Check your environment variables.");
//   }

//   try {
//     const response = await fetch(`${API_URL}/api/posts/search?q=${query}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error searching posts: ${response.statusText}`);
//     }

//     return await response.json(); // Return the search results
//   } catch (error) {
//     console.error("Error in searchPosts:", error);
//     throw error;
//   }
// };

export const createPost = async (post) => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
      body: JSON.stringify(post), // Send the post data as JSON
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    return await response.json(); // Return the created post
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error; // Rethrow the error to the caller
  }
};



export const updatePost = async (id, post) => {
  const API_URL = process.env.REACT_APP_API_URL;


  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(`Failed to update post with id ${id}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
};


export const deletePost = async (id) => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log(`Post with id ${id} deleted successfully.`);
      return; // No content expected for 204
    }

    if (!response.ok) {
      throw new Error(`Failed to delete post with id ${id}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error in deletePost:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};


export const fetchGuestbookEntries = async () => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  try {
    const response = await fetch(`${API_URL}/api/guestbook`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set Content-Type
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch guestbook entries: ${response.statusText}`);
    }

    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error("Error in fetchGuestbookEntries:", error);
    throw error;
  }
};


export const postNewGuestbookEntry = async (content) => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined. Check your environment variables.");
  }

  if (!content) {
    throw new Error("Content is required to post a message.");
  }

  try {
    const response = await fetch(`${API_URL}/api/guestbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set Content-Type
      },
      body: JSON.stringify({ content }), // Send the content in the body
    });

    if (!response.ok) {
      throw new Error(`Failed to post guestbook entry: ${response.statusText}`);
    }

    return await response.json(); // Return the new entry's data
  } catch (error) {
    console.error("Error in postNewGuestbookEntry:", error);
    throw error;
  }
};


export const fetchUserProfile = async () => {

  const API_URL = process.env.REACT_APP_API_URL; // Your backend URL
  const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage


  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`${API_URL}/api/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token for authentication
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.statusText}`);
  }

  return await response.json(); // Return the user details
};
