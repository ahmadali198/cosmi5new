import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    // You can remove this if logout isn't needed
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">📝 Blog App</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/create">➕ Create Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listposts">📋 View Posts</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-outline-light btn-sm me-2" to="/login">🔐 Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light btn-sm" to="/signup">🧾 Signup</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
