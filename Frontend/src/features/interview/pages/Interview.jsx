import React, { useState } from "react";
import { useParams } from "react-router";
import "../style/interview.scss";

const Interview = () => {
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical");
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const interviewData = {
    matchScore: 88,
    matchText: "Strong match for this role",
    technicalQuestions: [
      {
        id: 1,
        question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
        intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
        answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.",
      },
      {
        id: 2,
        question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
        intention: "To evaluate backend optimization skills and database query performance understanding.",
        answer: "Discuss using $match early in the pipeline, indexing strategies, avoiding large $lookup operations, using $project to limit fields, and leveraging aggregation stages efficiently.",
      },
      {
        id: 3,
        question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
        intention: "To test knowledge of caching strategies and performance optimization.",
        answer: "Explain the cache-aside pattern flow: check cache, if miss fetch from DB and store in cache. Use Redis for session management, rate limiting, real-time data, and frequently accessed data.",
      },
      {
        id: 4,
        question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
        intention: "To assess system design and architectural decision-making skills.",
        answer: "Cover data consistency, distributed transactions, service communication, deployment complexity, monitoring challenges, and the need for proper API design.",
      },
    ],
    behavioralQuestions: [
      {
        id: 1,
        question: "During your Skyscanner job simulation, you had to use an open-source React library. Describe a time you had to learn a new tool quickly to meet a deadline.",
        intention: "To evaluate the candidate's learning agility and ability to work under pressure.",
        answer: "Use the STAR method. Focus on reading documentation, looking at existing code examples, and building a small proof-of-concept before integrating it.",
      },
      {
        id: 2,
        question: "Tell me about a technical conflict you had with a teammate or a significant challenge in your code.",
        intention: "To assess teamwork, communication, and technical conflict resolution.",
        answer: "Describe a specific situation, different viewpoints, and how you used data or testing to reach the best solution for the project.",
      },
    ],
    skillGaps: [
      { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
      { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
      { skill: "Distributed Systems Design", severity: "medium" },
      { skill: "Production-level Redis management", severity: "low" },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Node.js internals & Streams",
        tasks: [
          "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
          "Practice implementing Node.js Streams for handling large data sets.",
        ],
      },
      {
        day: 2,
        focus: "Advanced MongoDB & Indexing",
        tasks: [
          "Study Compound Indexes, TTL Indexes, and Text Indexes.",
          "Practice complex Aggregation pipelines and using the explain('executionStats') method.",
        ],
      },
      {
        day: 3,
        focus: "Caching & Redis Strategies",
        tasks: [
          "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
          "Implement a rate-limiting solution using Redis in a sample API.",
        ],
      },
      {
        day: 4,
        focus: "System Design & Microservices",
        tasks: [
          "Study Microservices communication patterns (Synchronous vs Asynchronous).",
          "Learn about the Circuit Breaker pattern and Saga pattern for distributed transactions.",
        ],
      },
      {
        day: 5,
        focus: "DevOps & Containerization",
        tasks: [
          "Create a multi-stage Dockerfile for a Node.js app with optimizations.",
          "Set up a basic GitHub Actions workflow for CI/CD.",
        ],
      },
    ],
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: "severity-high",
      medium: "severity-medium",
      low: "severity-low",
    };
    return colors[severity] || colors.medium;
  };

  const getQuestions = () => {
    return activeTab === "technical"
      ? interviewData.technicalQuestions
      : interviewData.behavioralQuestions;
  };

  return (
    <div className="interview-page">
      <div className="interview-container">
        {/* Left Sidebar */}
        <aside className="interview-sidebar left-sidebar">
          <h3 className="sidebar-title">SECTIONS</h3>
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("technical");
                setExpandedQuestion(0);
              }}
            >
              <span className="icon">💻</span>
              <span>Technical Questions</span>
            </button>
            <button
              className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("behavioral");
                setExpandedQuestion(0);
              }}
            >
              <span className="icon">👥</span>
              <span>Behavioral Questions</span>
            </button>
            <button
              className={`nav-item ${activeTab === "preparation" ? "active" : ""}`}
              onClick={() => setActiveTab("preparation")}
            >
              <span className="icon">🗺️</span>
              <span>Road Map</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="interview-content">
          {activeTab === "preparation" ? (
            <div className="preparation-view">
              <h2 className="content-header-title">Preparation Road Map</h2>
              <p className="content-subtitle">7-day plan</p>

              <div className="timeline">
                {interviewData.preparationPlan.map((day, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="timeline-dot"></div>
                      {index < interviewData.preparationPlan.length - 1 && (
                        <div className="timeline-line"></div>
                      )}
                    </div>
                    <div className="timeline-content">
                      <h4 className="day-label">
                        Day {day.day} <span className="day-focus">{day.focus}</span>
                      </h4>
                      <ul className="tasks-list">
                        {day.tasks.map((task, idx) => (
                          <li key={idx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="questions-view">
              <div className="questions-header">
                <h2 className="content-header-title">
                  {activeTab === "technical" ? "Technical" : "Behavioral"} Questions
                </h2>
                <span className="question-count">
                  {getQuestions().length} questions
                </span>
              </div>

              <div className="questions-list">
                {getQuestions().map((q, index) => (
                  <div
                    key={q.id}
                    className={`question-card ${
                      expandedQuestion === index ? "expanded" : ""
                    }`}
                  >
                    <button
                      className="question-header"
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === index ? -1 : index
                        )
                      }
                    >
                      <span className="question-number">
                        Q{q.id}
                      </span>
                      <span className="question-text">{q.question}</span>
                      <span className="toggle-icon">
                        {expandedQuestion === index ? "▲" : "▼"}
                      </span>
                    </button>

                    {expandedQuestion === index && (
                      <div className="question-content">
                        <div className="content-section">
                          <h4 className="section-label">INTENTION</h4>
                          <p>{q.intention}</p>
                        </div>
                        <div className="content-section">
                          <h4 className="section-label">MODEL ANSWER</h4>
                          <p>{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="interview-sidebar right-sidebar">
          <div className="match-score-section">
            <h3 className="sidebar-title">MATCH SCORE</h3>
            <div className="circular-progress">
              <svg viewBox="0 0 100 100" className="progress-ring">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="progress-ring-circle"
                />
              </svg>
              <div className="progress-content">
                <div className="score-percentage">{interviewData.matchScore}%</div>
              </div>
            </div>
            <p className="match-text">{interviewData.matchText}</p>
          </div>

          <div className="skill-gaps-section">
            <h3 className="sidebar-title">SKILL GAPS</h3>
            <div className="skill-tags">
              {interviewData.skillGaps.map((gap, idx) => (
                <span
                  key={idx}
                  className={`skill-tag ${getSeverityColor(gap.severity)}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;

