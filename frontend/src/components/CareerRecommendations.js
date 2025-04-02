import React, { useState } from "react";
import axios from "axios";

const CareerRecommendations = () => {
  const [formData, setFormData] = useState({
    name: "",
    academicPerformance: "",
    interests: "",
    skills: "",
    workExperience: "", // New field for Work Experience
    certifications: "", // New field for Certifications
  });
  const [recommendations, setRecommendations] = useState([]);
  const [suggestedCertifications, setSuggestedCertifications] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { interests, skills, workExperience, certifications } = formData;

      // Send form data to backend
      const response = await axios.post(
        "http://localhost:5000/api/recommendations",
        {
          interests: interests.split(","),
          skills: skills.split(","),
          workExperience: workExperience.split(","),
          certifications: certifications.split(","),
        }
      );

      setRecommendations(response.data.recommendations);
      setSuggestedCertifications(response.data.suggestedCertifications);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  return (
    <div>
      <h3>Get Career Recommendations</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="academicPerformance"
          placeholder="Academic Performance"
          onChange={handleChange}
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests (comma separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="workExperience"
          placeholder="Work Experience/Internships (comma separated)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications/Courses (comma separated)"
          onChange={handleChange}
        />
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div>
          <h4>Recommended Careers:</h4>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {suggestedCertifications.length > 0 && (
        <div>
          <h4>Recommended Certifications:</h4>
          {suggestedCertifications.map((certGroup, index) => (
            <div key={index}>
              <strong>{certGroup.career}</strong>
              <ul>
                {certGroup.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;
