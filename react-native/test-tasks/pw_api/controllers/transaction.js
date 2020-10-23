const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Transaction = require("../models/Transaction");

// List of logged uer transactions
// @desc    Get all bootcamps
// @route   GET /api/protected/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    const { success, count, data } = res.advancedResults;
    const result = {
        success,
        count,
        data: {
            trans_token: data.map(({ _id, recipient, amount, balance, createdAt }) => ({
                id: _id,
                date: createdAt,
                username: recipient,
                amount,
                balance
            }))
        }
    }
    res.status(200).json(result);
});