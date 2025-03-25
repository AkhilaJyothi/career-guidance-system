const express = require("express");
const router = express.Router();

// Sample data to match interests and skills with careers
const careerData = [
  {
    interests: ["technology", "programming", "AI"],
    skills: ["JavaScript", "Python", "Machine Learning"],
    careers: ["Software Engineer", "AI Developer", "Data Scientist"],
  },
  {
    interests: ["design", "art", "creativity"],
    skills: ["Photoshop", "Illustrator", "UI/UX"],
    careers: ["Graphic Designer", "UI/UX Designer", "Animator"],
  },
  {
    interests: ["business", "management", "finance"],
    skills: ["Accounting", "Leadership", "Excel"],
    careers: ["Financial Analyst", "Project Manager", "Business Analyst"],
  },
  {
    interests: ["healthcare", "medicine", "biology"],
    skills: ["Research", "Lab Techniques", "Diagnosis"],
    careers: ["Doctor", "Biotechnologist", "Medical Researcher"],
  },
  {
    interests: ["writing", "communication", "journalism"],
    skills: ["Writing", "Editing", "Research"],
    careers: ["Content Writer", "Journalist", "Technical Writer"],
  },
  {
    interests: ["education", "teaching", "mentoring"],
    skills: ["Communication", "Lesson Planning", "Public Speaking"],
    careers: ["Teacher", "Educational Consultant", "Trainer"],
  },
  {
    interests: ["environment", "sustainability", "research"],
    skills: ["Data Analysis", "Field Work", "GIS"],
    careers: ["Environmental Scientist", "Research Analyst", "Conservationist"],
  },
  {
    interests: ["cybersecurity", "networking", "IT"],
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing"],
    careers: ["Cybersecurity Analyst", "Network Engineer", "Penetration Tester"],
  },
  {
    interests: ["marketing", "advertising", "sales"],
    skills: ["SEO", "Digital Marketing", "Social Media"],
    careers: ["Digital Marketer", "Sales Manager", "Brand Strategist"],
  },
  {
    interests: ["law", "justice", "advocacy"],
    skills: ["Legal Research", "Debate", "Critical Thinking"],
    careers: ["Lawyer", "Paralegal", "Legal Advisor"],
  },
];

// Helper function to match careers
const getRecommendations = (interests, skills) => {
  let matchedCareers = [];

  careerData.forEach((entry) => {
    // Check if at least 1 interest or skill matches
    const matchedInterests = entry.interests.filter((interest) =>
      interests.includes(interest.toLowerCase().trim())
    );
    const matchedSkills = entry.skills.filter((skill) =>
      skills.includes(skill.toLowerCase().trim())
    );

    // Add careers if any matches found
    if (matchedInterests.length > 0 || matchedSkills.length > 0) {
      matchedCareers = [...matchedCareers, ...entry.careers];
    }
  });

  // Remove duplicates and return unique career recommendations
  return [...new Set(matchedCareers)];
};

// Route to get career recommendations
router.post("/", (req, res) => {
  const { interests, skills } = req.body;

  if (!interests || !skills) {
    return res.status(400).json({ error: "Interests and skills are required." });
  }

  // Get recommendations
  const recommendations = getRecommendations(
    interests.map((i) => i.toLowerCase().trim()),
    skills.map((s) => s.toLowerCase().trim())
  );

  if (recommendations.length === 0) {
    return res.json({
      recommendations: ["No recommendations found. Try adding more details."],
    });
  }

  res.json({ recommendations });
});

module.exports = router;
