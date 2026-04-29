import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../../components/common/Loader";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !email.includes("@")) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await handleLogin({ email, password });
        if (result) {
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ submit: "Login failed. Please check your credentials." });
      }
    }
  };

  if (loading) {
    return <Loader text="Signing in..." />;
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue to ReviewAI</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.submit && <div className="form-error-banner">{errors.submit}</div>}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="button primary-button auth-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-features">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>AI-Powered Analysis</h3>
            <p>Get instant insights on your resume compatibility</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Results in just 2 seconds</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Detailed Reports</h3>
            <p>Comprehensive analysis across 50+ industries</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
