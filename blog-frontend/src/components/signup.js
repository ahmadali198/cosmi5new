import React, { useState } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: '', type: '' });


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(false);
    setAlert({ message: '', type: '' });

    try {
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      //   { name, email, password }
      // );
      
      const res = await axios.post(`http://localhost:8080/api/auth/register`, {
        name,email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setAlert({ message: '✅ Signup successful!', type: 'success' });

      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setAlert({
        message: err.response?.data?.error || '❌ Signup failed',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="text-center mb-4 text-primary fw-bold">📝 Sign Up</h2>

              {alert.message && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "User Registering..." : "register"}
        </button>
                </div>
              </form>

              <p className="text-center text-muted mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
