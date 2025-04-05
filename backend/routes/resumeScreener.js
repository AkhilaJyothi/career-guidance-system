const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const router = express.Router();
const upload = multer();

// Define roles and required skills
const rolesData = [
    { role: "Software Developer", skills: ["Java", "React", "Node.js", "API", "Git"] },
    { role: "Data Scientist", skills: ["Python", "AI", "Machine Learning", "TensorFlow", "Data Analysis"] },
    { role: "Web Developer", skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"] },
];

router.post("/", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Extract text from resume
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text.toLowerCase();

        let bestMatch = { role: null, matchedSkills: [], jobFitScore: 0 };

        rolesData.forEach(({ role, skills }) => {
            let matchedSkills = skills.filter(skill => resumeText.includes(skill.toLowerCase()));
            let jobFitScore = (matchedSkills.length / skills.length) * 100;

            if (jobFitScore > bestMatch.jobFitScore) {
                bestMatch = { role, matchedSkills, jobFitScore };
            }
        });

        let confidenceScore = bestMatch.jobFitScore >= 80 ? "High" :
                              bestMatch.jobFitScore >= 50 ? "Medium" : "Low";

        res.json({
            role: bestMatch.role || "No Match Found",
            matchedSkills: bestMatch.matchedSkills,
            jobFitScore: bestMatch.jobFitScore.toFixed(2) + "%",
            confidenceScore,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error analyzing resume" });
    }
});

module.exports = router;
