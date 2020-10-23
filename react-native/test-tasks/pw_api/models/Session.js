const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    /* email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    success: {
        type: Boolean,
        default: false
    },*/
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Session', SessionSchema);