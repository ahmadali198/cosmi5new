// src/components/PostList.js
import React, { useEffect, useState } from "react";
import API from '../api/axios';
import { Link, useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await API.get(`http://localhost:8080/api/posts`);
    setPosts(res.data);
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await API.get("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("token");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">All Blog Posts</h1>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              Logged in as: <strong>{user.name}</strong> ({user.email})
            </p>
          )}
        </div>
        <button
          onClick={() => {
            if (!user) {
              alert("Please login first");
              navigate("/login");
              return;
            }
            navigate("/create");
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          + Create New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mt-2 mb-4">{post.content}</p>
            <div className="flex gap-6 text-sm">
              <Link
                to={`/update/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
