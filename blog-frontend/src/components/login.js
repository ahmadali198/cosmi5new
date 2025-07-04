import React, { useState } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const res = await API.post(`http://localhost:8080/api/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/create"); // or wherever your home page is
        window.location.reload(); // optional
      } else {
        alert("❌ Login failed: No token received.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      alert("❌ Login failed. Check credentials or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-600 p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">🔐 Login</h2>

        {alert.message && (
          <div
            className={`text-sm text-center py-2 mb-4 rounded ${
              alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-200">
          Don't have an account?{' '}
          <a href="/signup" className="underline hover:text-yellow-300">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
