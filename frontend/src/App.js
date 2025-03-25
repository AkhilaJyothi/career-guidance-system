import React from "react";
import CareerRecommendations from "./components/CareerRecommendations";
import ResumeScreener from "./components/ResumeScreener";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <h1>Career Recommendations & Resume Screener</h1>
      <CareerRecommendations />
      <ResumeScreener />
    </div>
  );
}

export default App;
