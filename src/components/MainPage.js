import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      navigate("/auth/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/auth/login");
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="main-page">
        {/* Title Section */}
        <div className="title-container">
          <h1 className="title">
            <span>Welcome to</span>
            <span className="brand">Unstop</span>
          </h1>
        </div>

        {/* Profile Section */}
        <div className="profile">
          <img
            src={userData.image || "/default-avatar.png"}
            alt="User"
            className="profile-image"
          />
          <h2>
            {userData.firstName || "User"} {userData.lastName}
          </h2>
          <div className="data">
            <p>{userData.email || "example@gmail.com"}</p>
            <p>{userData.gender || "gender"}</p>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default MainPage;
