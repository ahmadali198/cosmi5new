import React, { useEffect, useState } from "react";
import API from '../api/axios';
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/api/posts/${id}`);
        const post = res.data;
  
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        console.error("Error fetching post:", err);
        setAlert({ message: "❌ Failed to fetch post.", type: "danger" });
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [id]);
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setSubmitting(true);
    setAlert({ message: "", type: "" });

    try {
      await API.put(`/api/posts/${id}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
     

      setAlert({ message: "✅ Post updated successfully!", type: "success" });
      setTimeout(() => navigate("/list-posts"));
    } catch (err) {
      console.error("Update failed:", err);
      setAlert({ message: "❌ Failed to update post.", type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3 text-muted">Loading post details...</p>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {alert.message && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="card-title text-center text-warning fw-bold mb-4">✏️ Edit Blog Post</h2>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Post Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new title"
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <small className="text-muted">{title.length}/100 characters</small>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Post Content</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Edit your blog content..."
                    maxLength={1000}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                  <small className="text-muted">{content.length}/1000 characters</small>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-warning fw-semibold" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      "✅ Update Post"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center text-muted mt-4">Update your blog post title and content as needed.</p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
