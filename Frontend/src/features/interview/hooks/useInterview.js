import { useContext } from "react";
import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    let response = null;
    setLoading(true);
    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (response && response.interviewReport) {
        setReport(response.interviewReport);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getReportById = async (interviewId) => {
    let response = null;
    setLoading(true);
    try {
      response = await getInterviewReportById(interviewId);
      if (response && response.interviewReport) {
        setReport(response.interviewReport);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getReports = async () => {
    let response = null;
    setLoading(true);
    try {
      response = await getAllInterviewReports();
      if (response && response.interviewReports) {
        setReports(response.interviewReports);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};
