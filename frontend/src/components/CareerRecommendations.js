import React, { useState } from "react";
import axios from "axios";

const CareerRecommendations = () => {
  const [formData, setFormData] = useState({
    name: "",
    academicPerformance: "",
    interests: "",
    skills: "",
  });
  const [recommendations, setRecommendations] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { interests, skills } = formData;

      // ✅ Debugging Logs
      console.log("Sending data to backend:", {
        interests: interests.split(","),
        skills: skills.split(","),
      });

      // API Request to Backend
      const response = await axios.post(
        "http://localhost:5000/api/recommendations",
        {
          interests: interests.split(","),
          skills: skills.split(","),
        }
      );

      // ✅ Log API response
      console.log("API Response:", response.data);

      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error(
        "Error getting recommendations:",
        error.response ? error.response.data : error.message
      );
      alert("Error fetching recommendations. Check server logs.");
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
    </div>
  );
};

export default CareerRecommendations;
