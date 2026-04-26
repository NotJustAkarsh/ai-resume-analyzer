import React from "react";
import "../style/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <h3>ReviewAI</h3>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Support</a>
            <a href="#api">API Documentation</a>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <p className="stat-value">99%</p>
            <p className="stat-label">ATS ACCURACY</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">2s</p>
            <p className="stat-label">PROCESSING TIME</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">50+</p>
            <p className="stat-label">INDUSTRIES</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 ReviewAI. Resume Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
