import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import ListPosts from "./components/ListPosts";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => {

  const shouldHideNavbar = false;

  return (
    <>
      {/* Only show navbar if path is not /login or /signup */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/listposts" />} />
        <Route
          path="/listposts"
          element={
            <ProtectedRoute>
              <ListPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/listposts" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;


