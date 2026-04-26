import React from "react";
import "../style/form.scss";

const InterviewForm = () => {
  return (
    <div className="interview-form-container">
      <div className="form-wrapper">
        <div className="form-left">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the full job description here to compare against your experience..."
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-right">
          <div className="form-section">
            <label htmlFor="resume">
              Resume
              <small className="highlight">
                (Use Resume and self description together for best results)
              </small>
            </label>
            <div className="upload-area">
              <div className="upload-icon">📁</div>
              <p className="upload-title">Upload your Resume</p>
              <p className="upload-text">
                Drag and drop your file here, or <span className="browse-link">browse files</span> from your device.
              </p>
              <div className="file-types">
                <span className="file-type">PDF</span>
                <span className="file-type">DOCX</span>
                <span className="file-type">DOC</span>
              </div>
              <input
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf, .doc, .docx"
              />
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="selfDescription">
              Candidate Profile / Self Description
            </label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your career goals or specific expertise..."
              className="form-textarea"
            ></textarea>
          </div>

          <button className="button primary-button analyze-btn">
            Analyze Resume ⚡
          </button>
          <p className="disclaimer">
            By clicking "Analyze Resume", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
