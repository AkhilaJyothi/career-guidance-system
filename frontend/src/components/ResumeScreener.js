import React, { useState } from "react";
import axios from "axios";

const ResumeScreener = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) return alert("Please upload a resume file!");

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const response = await axios.post("http://localhost:5000/api/resume", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setResult(response.data);
        } catch (error) {
            console.error("Error analyzing resume:", error);
            alert("Failed to analyze resume. Check backend logs.");
        }
    };

    return (
        <div>
            <h2>Resume Screening</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Analyze Resume</button>

            {result && (
                <div>
                    <h3>Resume Analysis Results:</h3>
                    <p><b>Role:</b> {result.role}</p>
                    <p><b>Matched Skills:</b> {result.matchedSkills.join(", ")}</p>
                    <p><b>Job Fit Score:</b> {result.jobFitScore}</p>
                    <p><b>Confidence Score:</b> {result.confidenceScore}</p>
                </div>
            )}
        </div>
    );
};

export default ResumeScreener;
