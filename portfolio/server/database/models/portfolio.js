const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  title: { type: String, require: true, maxlength: 128},
  jobTitle: { type: String, require: true},
  description: { type: String, require: true},
  company: { type: String, require: true, maxlength: 128},
  companyWebsite: { type: String, require: true, maxlength: 128},
  location: { type: String, require: true, maxlength: 128},
  createdAt: { type: Date, default: Date.now},
  startDate: { type: Date, require: true},
  endDate: Date,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);