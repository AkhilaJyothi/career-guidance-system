const express = require("express");
const cors = require("cors");
const recommendations = require("./routes/recommendations");
const resumeScreener = require("./routes/resumeScreener");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/recommendations", recommendations);
app.use("/api/resume-screener", resumeScreener);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
