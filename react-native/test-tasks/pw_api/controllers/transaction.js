const mongoose = require('mongoose');
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// List of logged uer transactions
// @desc    Get all bootcamps
// @route   GET /api/protected/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    const { success, count, data } = res.advancedResults;

    //onsole.log('transactions'.bgCyan, { data });

    const result = {
        success,
        count,
        data: {
            trans_token: data.map(({ _id, recipient, amount, balance, createdAt }) => ({
                id: _id,
                date: createdAt,
                username: recipient.username,
                amount,
                balance
            }))
        }
    }
    res.status(200).json(result);
});

exports.addCurrentUserToQuery = (req, res, next) => {
    req.query = {...req.query, sender: req.user.id };
    next();
}

exports.createTransaction = asyncHandler(async (req, res, next) => {
    const { username, amount } = req.body;

    // Transaction only for current user
    const currentUser = await User.findById(req.user.id);
    if(currentUser.balance < amount) {
        return next(new ErrorResponse('Balance exceeded', 400));
    }
    
    // Check for user
    const recipient = await User.findOne({ username }).select('+password');
    if(!recipient) {
        return next(new ErrorResponse('User not found', 400));
    }

    let transaction;
    const newSenderBalancePW = currentUser.balance - amount;
    const newRecipientBalancePW = recipient.balance + amount;
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        await User.findByIdAndUpdate(currentUser, {
            balance: newSenderBalancePW
        });
        await User.findByIdAndUpdate(recipient, {
            balance: newRecipientBalancePW
        });

        transaction = await Transaction.create({
            sender: currentUser,
            recipient:  recipient,
            amount,
            balance: newSenderBalancePW
        });


        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        return next(new ErrorResponse('Invalid transaction', 400));
    } finally {
        await session.endSession();
    }

    res.status(200).json({
        success: true,
        data: {
            trans_token: {
                id: transaction._id,
                date: transaction.createdAt,
                username: recipient.username,
                amount: transaction.amount,
                balance: transaction.balance
            }
        }
    });

});