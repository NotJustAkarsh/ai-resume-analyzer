import React, { useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import "../style/reportList.scss";

const ReportList = () => {
  const { reports, getReports, loading } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  if (loading && (!reports || reports.length === 0)) {
    return <div className="report-list-loading">Loading your reports...</div>;
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="report-list-section">
        <div className="report-list-container">
          <div className="report-list-header">
            <h2 className="report-list-title">Your Recent Interviews</h2>
            <p className="report-list-subtitle">You haven't generated any interview reports yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreClass = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 50) return "score-medium";
    return "score-low";
  };

  return (
    <div className="report-list-section">
      <div className="report-list-container">
        <div className="report-list-header">
          <h2 className="report-list-title">Your Recent Interviews</h2>
          <p className="report-list-subtitle">Review your past performance and AI feedback</p>
        </div>
        
        <div className="report-grid">
          {reports.map((report) => (
            <div 
              key={report._id} 
              className="report-card" 
              onClick={() => navigate(`/interview/${report._id}`)}
            >
              <div className="report-card-top">
                <h3 className="report-job-title" title={report.title}>{report.title}</h3>
                <span className="report-date">
                  {new Date(report.createdAt).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="report-card-bottom">
                <div className="score-container">
                  <div className={`score-circle ${getScoreClass(report.matchScore)}`}>
                    {report.matchScore}%
                  </div>
                  <span className="score-label">Match Score</span>
                </div>
                <div className="report-card-action">
                  <span>View Report</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportList;
