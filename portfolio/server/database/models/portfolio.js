const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    title: { type: String, maxlength: 128 },
    jobTitle: { type: String },
    description: { type: String },
    company: { type: String, maxlength: 128 },
    companyWebsite: { type: String, maxlength: 128 },
    location: { type: String, maxlength: 128 },
    startDate: { type: Date },
    endDate: Date,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    category: {
        enum: ["work", "learn"],
        type: String,
        required: true,
        default: "learn"
    },
    repository: String,
    deploy: String,
    taskDocument: String,
    imgName: {
        type: String,
        default: "default.png"
    },
    technologies: String,
    languages: String,
    technologyImgs: String,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);