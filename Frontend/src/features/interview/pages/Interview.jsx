import React, { useState } from "react";
import { useParams } from "react-router";
import "../style/interview.scss";

const Interview = () => {
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical"); // technical, behavioral, preparation
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock data - will be replaced with API call
  const interviewData = {
    matchScore: 85,
    technicalQuestions: [
      {
        question: "In your CodeByte project, you used Prisma with PostgreSQL...",
        intention: "To evaluate the candidate's understanding of database management...",
        answer: "The candidate should mention type safety, ease of maintenance...",
      },
      {
        question: "You mentioned implementing JWT-based access control...",
        intention: "To assess the candidate's depth of knowledge in security practices...",
        answer: "Explain that rotation limits the lifespan of a stolen token...",
      },
      {
        question: "When building the CodeByte platform with Next.js...",
        intention: "To check for architectural decision-making skills...",
        answer: "The candidate should explain that SSG (with ISR) is ideal for blogs...",
      },
    ],
    behavioralQuestions: [
      {
        question: "During your Skyscanner job simulation...",
        intention: "To evaluate the candidate's learning agility...",
        answer: "Use the STAR method. Focus on reading documentation...",
      },
      {
        question: "In your projects, you worked with various technologies...",
        intention: "To assess teamwork, communication, and technical conflict resolution...",
        answer: "The candidate should describe a specific situation...",
      },
    ],
    skillGaps: [
      { skill: "Redis", severity: "medium" },
      { skill: "AWS", severity: "medium" },
      { skill: "Zustand", severity: "low" },
      { skill: "Docker", severity: "high" },
      { skill: "Jest", severity: "high" },
      { skill: "Cypress", severity: "high" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Next.js & Advanced React Patterns",
        tasks: [
          "Review Next.js 14/15 Server Actions",
          "Practice implementing Dynamic Routes",
          "Read about React Server Components (RSC)",
        ],
      },
      {
        day: 2,
        focus: "Backend Security & Auth Deep Dive",
        tasks: [
          "Re-implement Node.js Auth flow using JWT",
          "Research OWASP Top 10 vulnerabilities",
          "Configure CORS and Helmet.js middleware",
        ],
      },
      {
        day: 3,
        focus: "Database Optimization & SQL Performance",
        tasks: [
          "Practice writing complex SQL joins",
          "Analyze Prisma query logs",
          "Compare SQL vs NoSQL for specific use cases",
        ],
      },
      {
        day: 4,
        focus: "DevOps & Deployment Basics",
        tasks: [
          "Containerize the CodeByte Blog using Dockerfile",
          "Set up GitHub Action for linting",
          "Learn basics of AWS EC2 and S3",
        ],
      },
      {
        day: 5,
        focus: "System Design & Architecture",
        tasks: [
          "Study Load Balancing and Horizontal Scaling",
          "Draw system architecture diagram",
          "Read about Rate Limiting implementation",
        ],
      },
      {
        day: 6,
        focus: "Testing & Quality Assurance",
        tasks: [
          "Write unit tests for Express utilities",
          "Learn to mock Prisma/Database calls",
          "Perform UI audit for accessibility",
        ],
      },
      {
        day: 7,
        focus: "Behavioral Prep & Mock Interviews",
        tasks: [
          "Prepare 3 stories using STAR method",
          "Review common Full Stack interview questions",
          "Record yourself explaining architecture",
        ],
      },
    ],
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "medium";
    }
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case "technical":
        return interviewData.technicalQuestions[selectedIndex];
      case "behavioral":
        return interviewData.behavioralQuestions[selectedIndex];
      case "preparation":
        return interviewData.preparationPlan[selectedIndex];
      default:
        return null;
    }
  };

  const getMaxItems = () => {
    switch (activeTab) {
      case "technical":
        return interviewData.technicalQuestions.length;
      case "behavioral":
        return interviewData.behavioralQuestions.length;
      case "preparation":
        return interviewData.preparationPlan.length;
      default:
        return 0;
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-container">
        {/* Left Sidebar */}
        <div className="interview-sidebar left-sidebar">
          <div className="sidebar-section">
            <h3 className="section-title">Technical Questions</h3>
            <button
              className={`section-button ${
                activeTab === "technical" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("technical");
                setSelectedIndex(0);
              }}
            >
              {interviewData.technicalQuestions.length} Questions
            </button>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">Behavioral Questions</h3>
            <button
              className={`section-button ${
                activeTab === "behavioral" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("behavioral");
                setSelectedIndex(0);
              }}
            >
              {interviewData.behavioralQuestions.length} Questions
            </button>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title preparation-title">PREPARATION PLAN</h3>
            <button
              className={`section-button ${
                activeTab === "preparation" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("preparation");
                setSelectedIndex(0);
              }}
            >
              {interviewData.preparationPlan.length} Days
            </button>
          </div>
        </div>

        {/* Middle Content */}
        <div className="interview-content">
          <div className="content-header">
            <div className="match-badge">
              <div className="match-score">{interviewData.matchScore}%</div>
              <div className="match-label">Match Score</div>
            </div>
            <div className="content-title">
              {activeTab === "technical" && "Technical Questions"}
              {activeTab === "behavioral" && "Behavioral Questions"}
              {activeTab === "preparation" && "Preparation Plan"}
            </div>
          </div>

          <div className="content-body">
            {activeTab === "preparation" ? (
              <div className="preparation-content">
                <div className="day-header">
                  <h2>Day {getCurrentContent()?.day}</h2>
                  <p className="day-focus">{getCurrentContent()?.focus}</p>
                </div>
                <div className="tasks-list">
                  <h4>Today's Tasks:</h4>
                  <ul>
                    {getCurrentContent()?.tasks.map((task, idx) => (
                      <li key={idx}>
                        <span className="task-bullet">→</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="question-content">
                <div className="question-section">
                  <h3 className="question-label">Question</h3>
                  <p className="question-text">{getCurrentContent()?.question}</p>
                </div>

                <div className="question-section">
                  <h3 className="question-label">Interviewer Intention</h3>
                  <p className="intention-text">
                    {getCurrentContent()?.intention}
                  </p>
                </div>

                <div className="question-section">
                  <h3 className="question-label">Expected Answer</h3>
                  <p className="answer-text">{getCurrentContent()?.answer}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="content-navigation">
              <button
                className="nav-button prev"
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : getMaxItems() - 1
                  )
                }
              >
                ← Previous
              </button>

              <span className="nav-counter">
                {selectedIndex + 1} / {getMaxItems()}
              </span>

              <button
                className="nav-button next"
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev < getMaxItems() - 1 ? prev + 1 : 0
                  )
                }
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Skill Gaps */}
        <div className="interview-sidebar right-sidebar">
          <h3 className="skills-title">SKILL GAPS</h3>
          <div className="skills-container">
            {interviewData.skillGaps.map((gap, idx) => (
              <div
                key={idx}
                className={`skill-badge ${getSeverityColor(gap.severity)}`}
              >
                {gap.skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;

