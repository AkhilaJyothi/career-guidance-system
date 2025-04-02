const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const router = express.Router();

// Multer setup for uploading resumes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sample resume screening rules with job profiles
const jobProfiles = {
  "Software Developer": {
    keywords: ["Java", "React", "Node.js", "API", "Git"],
    requiredExperience: 1, // Minimum experience in years
    certifications: ["Full Stack", "Web Development"],
  },
  "Data Scientist": {
    keywords: ["Python", "Machine Learning", "Data Analysis", "AI"],
    requiredExperience: 1,
    certifications: ["Data Science", "AI Certification"],
  },
  "Cybersecurity Analyst": {
    keywords: ["Network Security", "Ethical Hacking", "Firewall"],
    requiredExperience: 1,
    certifications: ["Cybersecurity", "CEH"],
  },
};

// Analyze the extracted text from the resume
const analyzeResume = (text) => {
  const resumeData = text.toLowerCase();
  const recommendations = [];

  for (const job in jobProfiles) {
    const { keywords, requiredExperience, certifications } = jobProfiles[job];
    const matchedKeywords = keywords.filter((word) => resumeData.includes(word.toLowerCase()));
    const matchedCertifications = certifications.filter((cert) =>
      resumeData.includes(cert.toLowerCase())
    );

    // Check if enough keywords and certifications match
    if (matchedKeywords.length >= 2 || matchedCertifications.length >= 1) {
      recommendations.push({
        role: job,
        matchedKeywords,
        matchedCertifications,
        confidenceScore: matchedKeywords.length * 10,
      });
    }
  }

  return recommendations.length > 0
    ? recommendations
    : [{ role: "No suitable matches found.", matchedKeywords: [], confidenceScore: 0 }];
};

// API route to upload and screen resume
router.post("/screen", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded!" });
    }

    // Extract text from the uploaded resume
    const resumeBuffer = req.file.buffer;
    const data = await pdfParse(resumeBuffer);

    // Analyze the resume content and get recommendations
    const recommendations = analyzeResume(data.text);

    res.json({ recommendations });
  } catch (error) {
    console.error("Error screening resume:", error);
    res.status(500).json({ error: "Error processing the resume." });
  }
});

module.exports = router;
