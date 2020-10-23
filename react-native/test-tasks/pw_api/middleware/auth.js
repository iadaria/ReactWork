const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async(req, res,next) => {
    let token;

    if (
        req.header.authorization &&
        req.header.authorization.startWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        //return next(new ErrorResponse("Not authorizate to access this route", 401));
        return next(new ErrorResponse("UnauthorizedError", 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch(err) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
});