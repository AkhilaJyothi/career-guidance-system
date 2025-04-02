const express = require("express");
const cors = require("cors");
const recommendationsRoutes = require("./routes/recommendations");
const resumeScreenerRoutes = require("./routes/resumeScreener"); // Add this line

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recommendations", recommendationsRoutes);
app.use("/api/resume", resumeScreenerRoutes); // Add this line

app.get("/", (req, res) => {
  res.send("Career Guidance System Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
