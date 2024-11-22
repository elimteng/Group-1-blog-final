const API_URL = process.env.REACT_APP_API_URL;

// Check if API_URL is defined
if (!API_URL) {
  console.error("Error: API_URL is not defined in your environment variables.");
  process.exit(1); // Exit the process with an error code
}

export const fetchPosts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchLimitedPosts = async () => {
  const response = await fetch(`${API_URL}/limited`);
  return response.json();
};

export const fetchSinglePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch the blog");
  }
  return response.json();
};


export const createPost = async (post) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

