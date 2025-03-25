import React, { useState } from "react";
import axios from "axios";

const ResumeScreener = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle resume upload and send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume-screener",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error uploading resume:", error);
      setFeedback("Error screening the resume.");
    }
  };

  return (
    <div>
      <h3>Resume Screener</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
        />
        <button type="submit">Screen Resume</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default ResumeScreener;
