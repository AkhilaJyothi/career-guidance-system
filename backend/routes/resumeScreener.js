const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const textract = require("textract");
const path = require("path");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Define keywords for various fields
const skillsKeywords = ["Java", "Python", "React", "Node.js", "SQL", "ML", "AI"];
const educationKeywords = ["B.Tech", "M.Tech", "Computer Science", "Data Science"];
const experienceKeywords = ["intern", "developer", "engineer", "project", "research"];

// Analyze resume content and generate feedback
const analyzeResume = (text) => {
  let feedback = "";

  // Check skills
  const foundSkills = skillsKeywords.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
  feedback += foundSkills.length
    ? `Skills found: ${foundSkills.join(", ")}.\n`
    : "No matching skills found.\n";

  // Check education
  const foundEducation = educationKeywords.filter((edu) =>
    text.toLowerCase().includes(edu.toLowerCase())
  );
  feedback += foundEducation.length
    ? `Education matches: ${foundEducation.join(", ")}.\n`
    : "Relevant education not found.\n";

  // Check experience
  const foundExperience = experienceKeywords.filter((exp) =>
    text.toLowerCase().includes(exp.toLowerCase())
  );
  feedback += foundExperience.length
    ? `Experience detected in: ${foundExperience.join(", ")}.\n`
    : "No relevant experience found.\n";

  // Provide final suggestion
  if (foundSkills.length > 2 && foundExperience.length > 1) {
    feedback += "✅ Resume looks strong. Suitable for technical roles.\n";
  } else {
    feedback += "❗️ Consider improving your skills and adding more relevant experience.\n";
  }

  return feedback;
};

// Upload and analyze resume
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    let text = "";
    if (fileExtension === ".pdf") {
      const dataBuffer = require("fs").readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if ([".doc", ".docx"].includes(fileExtension)) {
      text = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (error, text) => {
          if (error) reject(error);
          else resolve(text);
        });
      });
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const feedback = analyzeResume(text);
    res.json({ feedback });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Error analyzing the resume." });
  }
});

module.exports = router;
