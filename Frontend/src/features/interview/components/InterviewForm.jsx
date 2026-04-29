import React, { useRef, useState } from "react";
import "../style/form.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import Loader from "../../../components/common/Loader";

const InterviewForm = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const resumeInputRef = useRef();
  const uploadAreaRef = useRef();

  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (file && file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      setUploadedFile(file);
      resumeInputRef.current.files = new DataTransfer().items.add(file) && resumeInputRef.current.files;
    } else {
      alert("Please upload a valid file (PDF, DOC, or DOCX)");
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === uploadAreaRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleGenerateReport = async () => {
    if (!uploadedFile) {
      alert("Please upload your resume first");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile: uploadedFile,
    });
    console.log(data)
    navigate(`/interview/${data._id}`)
  };

  if(loading){
    return <Loader text="Analyzing Resume..." />;
  }
  return (
    <div className="interview-form-container">
      <div className="form-wrapper">
        <div className="form-left">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
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
            <div
              ref={uploadAreaRef}
              className={`upload-area ${isDragging ? "dragging" : ""} ${uploadedFile ? "file-uploaded" : ""}`}
              onClick={() => resumeInputRef.current.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="file-preview">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <p className="file-name">{uploadedFile.name}</p>
                    <p className="file-size">{getFileSize(uploadedFile.size)}</p>
                  </div>
                  <div className="file-status">✓</div>
                </div>
              ) : (
                <>
                  <div className="upload-icon">📁</div>
                  <p className="upload-title">Upload your Resume</p>
                  <p className="upload-text">
                    Drag and drop your file here, or{" "}
                    <span className="browse-link">browse files</span> from your
                    device.
                  </p>
                  <div className="file-types">
                    <span className="file-type">PDF</span>
                    <span className="file-type">DOCX</span>
                    <span className="file-type">DOC</span>
                  </div>
                </>
              )}
              <input
                hidden
                ref={resumeInputRef}
                type="file"
                name="resume"
                id="resume"
                accept=".pdf, .doc, .docx"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="selfDescription">
              Candidate Profile / Self Description
            </label>
            <textarea
              onChange={(e) => {
                setSelfDescription(e.target.value);
              }}
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your career goals or specific expertise..."
              className="form-textarea"
            ></textarea>
          </div>

          <button onClick={handleGenerateReport} className="button primary-button analyze-btn">
            Analyze Resume ⚡
          </button>
          <p className="disclaimer">
            By clicking "Analyze Resume", you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
