import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Navigate } from "react-router-dom";

function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setisAuth(false);
      window.location.pathname = "/login";
    });
  };

  function ProtectedRoute({ children }) {
    if (!isAuth) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <Router>
      <nav>
        <Link className="btn" to="/">
          Home
        </Link>

        {!isAuth ? (
          <Link className="btn" to="/login">
            Log In
          </Link>
        ) : (
          <>
            <Link className="btn" to="/createpost">
              Create Post
            </Link>
            <button className="logOut btn" onClick={signUserOut}>
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setisAuth={setisAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
