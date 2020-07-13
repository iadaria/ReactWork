const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    key: String,
    languageCode: {
        type: String,
        maxlength: 2
    },
    part: String,
    value: String
});

module.exports = mongoose.model('Word', wordSchema);