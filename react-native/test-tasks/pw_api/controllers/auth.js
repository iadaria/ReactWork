const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require("../middleware/async");
const User = require('../models/User');
const Session = require('../models/Session');

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const session = await Session.create({
        user: user._id,
        token
    });

    res
        .status(statusCode)
        .json({
            success: true,
            "id_token": token
        });
};

// @desc    Create/Register a user
// @route   POST /users
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    //console.log(req.body);
    const { username, password, email } = req.body;

    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('You must send username and password', 400));
    }


    const foundUserByEmail = await User.findOne({ email });
    if (foundUserByEmail) {
        return next(new ErrorResponse('A user with that email already exists', 400));
    }

    const foundUserByName = await User.findOne({ username });
    if (foundUserByName) {
        return next(new ErrorResponse('A user with that username already exists', 400));
    }

    // Create user
    const user = await User.create({
        username,
        email,
        password
        //balance: 500
    });

    //await user.save();

    await sendTokenResponse(user, 200, res);
});

// @desc    Login
// @route   POST /sessions/create
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('You must send email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        //return next(new ErrorResponse('Invalid credentials', 400));
        return next(new ErrorResponse('Invalid email or password', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid email or password', 401));
    }

    await sendTokenResponse(user, 200, res);
});

// @desc    Filtered User list
// @route   POST /api/protected/users/list
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
    const { success, count, data } = res.advancedResults;
    const result = {
        success,
        count,
        data: data.map(({ _id, username, email, createdAt }) => ({
            id: _id,
            name: username
        }))
    };

    res.status(200).json(result); //res.advancedResults
});

exports.getUserInfo = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.username,
            email: user.email,
            balance: user.balance
        }
    });
});