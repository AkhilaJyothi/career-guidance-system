const express = require("express");
const router = express.Router();

// Define career paths with relevant certifications and courses
const recommendationsData = {
  "Software Developer": {
    skills: ["Java", "Python", "React", "Node.js"],
    certifications: ["Full Stack Developer", "Web Development", "Backend Developer"],
    workExperience: ["intern", "developer", "software"],
    recommendedCertifications: ["Advanced React", "MERN Stack Masterclass", "Backend Development"],
  },
  "Data Scientist": {
    skills: ["Python", "Machine Learning", "Data Analysis"],
    certifications: ["Data Science", "AI", "ML"],
    workExperience: ["data analysis", "research", "AI"],
    recommendedCertifications: ["TensorFlow Advanced", "Data Visualization with Python", "AI Ethics"],
  },
  "Cybersecurity Analyst": {
    skills: ["Network Security", "Ethical Hacking", "Cryptography"],
    certifications: ["Cybersecurity", "Ethical Hacking"],
    workExperience: ["security", "analysis", "network"],
    recommendedCertifications: ["Certified Ethical Hacker (CEH)", "CompTIA Security+"],
  },
  "UI/UX Designer": {
    skills: ["Figma", "UI Design", "Adobe XD"],
    certifications: ["UI/UX Design"],
    workExperience: ["design", "user experience", "UI/UX"],
    recommendedCertifications: ["UX Research Masterclass", "Figma Advanced Design"],
  },
  "Cloud Engineer": {
    skills: ["AWS", "Azure", "Cloud Architecture"],
    certifications: ["Cloud Computing", "AWS Certified"],
    workExperience: ["cloud", "deployment", "infrastructure"],
    recommendedCertifications: ["AWS Solutions Architect", "Google Cloud Professional"],
  },
};

// Analyze user input and return recommendations
const getRecommendations = ({
  skills,
  interests,
  workExperience,
  certifications,
}) => {
  const matchedCareers = [];
  const suggestedCertifications = [];

  for (const career in recommendationsData) {
    const {
      skills: requiredSkills,
      workExperience: requiredExp,
      certifications: requiredCerts,
      recommendedCertifications,
    } = recommendationsData[career];

    const skillsMatch = requiredSkills.some((skill) =>
      skills.includes(skill.toLowerCase())
    );
    const workMatch = requiredExp.some((exp) =>
      workExperience.includes(exp.toLowerCase())
    );
    const certMatch = requiredCerts.some((cert) =>
      certifications.includes(cert.toLowerCase())
    );

    // Add career if at least one category matches
    if (skillsMatch || workMatch || certMatch) {
      matchedCareers.push(career);

      // Suggest certifications if required ones are not met
      if (!certMatch) {
        suggestedCertifications.push({
          career,
          certifications: recommendedCertifications,
        });
      }
    }
  }

  return {
    careers:
      matchedCareers.length > 0
        ? matchedCareers
        : ["No suitable career recommendations found. Consider enhancing your skills."],
    suggestedCertifications:
      suggestedCertifications.length > 0 ? suggestedCertifications : [],
  };
};

// Route to get career recommendations and certifications
router.post("/", (req, res) => {
  const {
    skills = [],
    interests = [],
    workExperience = [],
    certifications = [],
  } = req.body;

  const { careers, suggestedCertifications } = getRecommendations({
    skills: skills.map((s) => s.toLowerCase().trim()),
    interests: interests.map((i) => i.toLowerCase().trim()),
    workExperience: workExperience.map((w) => w.toLowerCase().trim()),
    certifications: certifications.map((c) => c.toLowerCase().trim()),
  });

  res.json({ recommendations: careers, suggestedCertifications });
});

module.exports = router;
