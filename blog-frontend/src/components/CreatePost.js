import React, { useState } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ No token found. Please log in.");
      return;
    }

    try {
      const response = await API.post(
        `http://localhost:8080/api/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Post created:", response.data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      alert("❌ Failed to create post. Please try again or re-login.");
    }
  }; // ✅ This was missing!

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="bg-white p-5 shadow-lg rounded-4 border border-light-subtle">
            <h2 className="text-center fw-bold text-primary mb-4">
              📝 Create a New Blog Post
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold">Post Title</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  placeholder="Enter an eye-catching title"
                  maxLength={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <small className="text-muted">{title.length}/100 characters</small>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Content</label>
                <textarea
                  className="form-control shadow-sm"
                  rows="8"
                  placeholder="Write your blog post content..."
                  maxLength={1000}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
                <small className="text-muted">{content.length}/1000 characters</small>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success btn-lg">
                  🚀 Publish Post
                </button>
              </div>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Your post will be visible in the <strong>Posts List</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
