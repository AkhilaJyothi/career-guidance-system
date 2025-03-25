const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    academicPerformance: Number,
    interests: [String],
    skills: [String],
    resume: String
});

module.exports = mongoose.model('Student', StudentSchema);
