import React from "react";
import "../style/hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-badge">AI-Powered Resume Analysis</div>
      <h2 className="hero-title">
        Analyze Your Resume Against{" "}
        <span className="gradient-text">Any Job</span>
      </h2>
      <p className="hero-description">
        Leverage advanced AI to bridge the gap between your profile and your dream
        role. Get instant compatibility scores, skill gap analysis, and a personalized
        interview preparation plan.
      </p>
    </section>
  );
};

export default Hero;
