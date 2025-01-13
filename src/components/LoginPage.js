import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username !== "emilys") {
      setError("Username/password does not match");
      setShowPopup(true);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      setShowPopup(true);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
        email,
        expiresInMins: 30,
      });

      localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please try again.");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setError("");
  };

  return (
    <div className="login-container">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{error}</p>
            <button onClick={closePopup}>Okay</button>
          </div>
        </div>
      )}
      <div className="login-left">
        <img src="/login-illustration.png" alt="Login Illustration" />
      </div>
      <div className="login-right">
        <h1 className="title">
          <span>Welcome to</span>
          <span className="brand">Unstop</span>
        </h1>

        <div className="social-login-buttons">
          <button className="social-btn google-btn">
            <img src="/google-icon.png" alt="Google" />
            Login with Google
          </button>
          <button className="social-btn facebook-btn">
            <img src="/facebook-icon.png" alt="Facebook" />
            Login with Facebook
          </button>
        </div>
        <p className="or-divider">OR</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon">
              <img src="/user-icon.png" alt="User" />
            </span>
            <div className="input-wrapper">
              <label htmlFor="username">User name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <span className="input-icon">
              <img src="/email-icon.png" alt="Email" />
            </span>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <span className="input-icon">
              <img src="/password-icon.png" alt="Password" />
            </span>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <span className="input-eye">
              <img src="/eye-icon.png" alt="Show/Hide Password" />
            </span>
          </div>
          <div className="remember-me">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
