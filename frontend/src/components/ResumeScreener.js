import React, { useState } from "react";
import axios from "axios";

const ResumeScreening = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit file for analysis
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/screen",
        formData
      );
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error screening resume:", error);
      alert("Error processing the resume.");
    }
  };

  return (
    <div>
      <h3>Resume Screening</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit">Analyze Resume</button>
      </form>

      {recommendations.length > 0 && (
        <div>
          <h4>Resume Analysis Results:</h4>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <strong>Role:</strong> {rec.role} <br />
                <strong>Matched Keywords:</strong>{" "}
                {rec.matchedKeywords.join(", ")} <br />
                <strong>Confidence Score:</strong> {rec.confidenceScore}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeScreening;
