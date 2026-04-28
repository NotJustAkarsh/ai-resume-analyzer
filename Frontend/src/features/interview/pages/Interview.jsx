import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../style/interview.scss"
import { useInterview } from "../hooks/useInterview";
import { generateResumePdf } from "../services/interview.api";
import Loader from "../../../components/common/Loader";

const Interview = () => {
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical");
  const [expandedQuestion, setExpandedQuestion] = useState(0);
  const [downloadingResume, setDownloadingResume] = useState(false);
  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  const handleDownloadResume = async () => {
    try {
      setDownloadingResume(true);
      const pdfBlob = await generateResumePdf({ interviewReportId: interviewId });
      
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    } finally {
      setDownloadingResume(false);
    }
  };

  if (loading || !report) {
    return <Loader text="Fetching Analysis..." />;
  }
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
      ? report.technicalQuestions
      : report.behavioralQuestions;
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
            <button 
              className="primary"
              onClick={handleDownloadResume}
              disabled={downloadingResume}
            >
              {downloadingResume ? "Downloading..." : "Download Resume"}
            </button>
          </nav>
        </aside>

        {/* Mobile Navigation Tabs */}
        <div className="mobile-tabs">
          <button
            className={`mobile-tab ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("technical");
              setExpandedQuestion(0);
            }}
          >
            💻 Technical
          </button>
          <button
            className={`mobile-tab ${activeTab === "behavioral" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("behavioral");
              setExpandedQuestion(0);
            }}
          >
            👥 Behavioral
          </button>
          <button
            className={`mobile-tab ${activeTab === "preparation" ? "active" : ""}`}
            onClick={() => setActiveTab("preparation")}
          >
            🗺️ Road Map
          </button>
        </div>

        {/* Mobile Download Button — full width row, always visible */}
        <div className="mobile-download">
          <button
            className="mobile-download-btn"
            onClick={handleDownloadResume}
            disabled={downloadingResume}
          >
            {downloadingResume ? "⏳ Downloading..." : "⬇ Download Resume"}
          </button>
        </div>

        {/* Main Content */}
        <main className="interview-content">
          {activeTab === "preparation" ? (
            <div className="preparation-view">
              <h2 className="content-header-title">Preparation Road Map</h2>
              <p className="content-subtitle">7-day plan</p>

              <div className="timeline">
                {report.preparationPlan.map((day, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="timeline-dot"></div>
                      {index < report.preparationPlan.length - 1 && (
                        <div className="timeline-line"></div>
                      )}
                    </div>
                    <div className="timeline-content">
                      <h4 className="day-label">
                        Day {day.day}{" "}
                        <span className="day-focus">{day.focus}</span>
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
                  {activeTab === "technical" ? "Technical" : "Behavioral"}{" "}
                  Questions
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
                          expandedQuestion === index ? -1 : index,
                        )
                      }
                    >
                      <span className="question-number">Q{q.id}</span>
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
                <div className="score-percentage">{report.matchScore}%</div>
              </div>
            </div>
            <p className="match-text">{report.matchText}</p>
          </div>

          <div className="skill-gaps-section">
            <h3 className="sidebar-title">SKILL GAPS</h3>
            <div className="skill-tags">
              {report.skillGaps.map((gap, idx) => (
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
