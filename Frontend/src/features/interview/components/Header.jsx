import React from "react";
import "../style/header.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Header = () => {
  const { loading, handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ReviewAI</h1>
        </div>
        <div className="nav">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
