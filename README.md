# **Blog Project**

Welcome to our blog platform! This project is a modern, dynamic blogging application designed to create, view, edit, and manage posts with ease. Built using **React**, **MongoDB**, and a robust API, this platform offers a seamless experience for users to explore and share content.

---

## **Features**

- **Create Posts**: Add new blog posts with a title, subtitle, and rich-text content.
- **View Blogs**: Browse posts on the homepage with summaries and timestamps.
- **Edit Content**: Update blog titles, subtitles, and content dynamically.
- **Delete Posts**: Remove posts with a single click.
- **Responsive Design**: Accessible and optimized for all screen sizes.
- **Real-Time Validation**: Ensures all fields are filled before submission.

---

## **Technologies Used**

- **Frontend**: React (with CKEditor for rich text editing)
- **Backend**: Node.js, Express.js, and MongoDB (Atlas)
- **Styling**: Bootstrap and custom CSS
- **Development Tools**: Concurrently, Nodemon

---

## **How to Use**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-repo/blog-project.git
cd blog-react
```

### **2. Install Dependencies**

Run the following command in the project root:

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the `server` directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=Your_Secret_Code
JWT_EXPIRES_IN=1d
```

Create a `.env` file in the `client` directory and add the following:

```env
REACT_APP_API_URL=http://localhost:5001/
```

### **4. Start the Application**

Use the following command to start both the client and server:

```bash
npm start
```

The React app will be available at `http://localhost:3000` and the backend API at `http://localhost:5001`.

---

## **Expected Behavior**

- **Homepage**: Displays a list of blog posts with titles, subtitles, and timestamps. If no posts exist, you'll see a "No posts available" message.
- **Single Blog View**: Clicking on a post title navigates to the full blog content.
- **Create Post**: Use the "Create Post" button to add a new post. The rich text editor allows formatting.
- **Edit Post**: Enter edit mode from the homepage or single post view to update content.
- **Delete Post**: Remove unwanted posts with a single click.

---

## **Folder Structure**

```
Blog-React
├─ 📁client
│  ├─ 📁node_modules
│  ├─ 📁public
│  │  ├─ 📁static
│  │  │  └─ 📁img
│  │  │     ├─ 📄about-bg.jpg
│  │  │     ├─ 📄antique.jpeg
│  │  │     ├─ 📄bently.jpeg
│  │  │     ├─ 📄computer.jpg
│  │  │     ├─ 📄contact-bg.jpg
│  │  │     ├─ 📄favicon.ico
│  │  │     ├─ 📄home-bg.jpg
│  │  │     ├─ 📄post-bg.jpg
│  │  │     ├─ 📄post-sample-image.jpg
│  │  │     ├─ 📄read.jpeg
│  │  │     ├─ 📄statue-of-liberty.png
│  │  │     ├─ 📄vechicle.jpg
│  │  │     └─ 📄write.jpeg
│  │  └─ 📄index.html
│  ├─ 📁src
│  │  ├─ 📁Pages
│  │  │  ├─ 📄About.js
│  │  │  ├─ 📄Contact.js
│  │  │  ├─ 📄Home.js
│  │  │  └─ 📄WritePost.js
│  │  ├─ 📁api
│  │  │  └─ 📄api.js
│  │  ├─ 📁components
│  │  │  ├─ 📄Blog.js
│  │  │  ├─ 📄Blogs.js
│  │  │  ├─ 📄Footer.js
│  │  │  ├─ 📄Layout.js
│  │  │  ├─ 📄Navbar.js
│  │  │  └─ 📄PageHeader.js
│  │  ├─ 📄App.css
│  │  ├─ 📄App.js
│  │  └─ 📄index.js
│  ├─ 📄.env
│  ├─ 📄package-lock.json
│  └─ 📄package.json
├─ 📁server
│  ├─ 📁models
│  │  └─ 📄Post.js
│  ├─ 📁node_modules
│  ├─ 📁routes
│  │  └─ 📄postRoutes.js
│  ├─ 📄.env
│  ├─ 📄package-lock.json
│  ├─ 📄package.json
│  └─ 📄server.js
├─ 📄.gitignore
├─ 📄README.md
├─ 📄package-lock.json
└─ 📄package.json
```

---

## **Contributing**

We welcome contributions! If you'd like to enhance the project:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See `LICENSE` for more details.
