// @desc    Create and send message by token
// @route   POST /api/v0/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            data: req.body
        });
    } catch (error) {
        next(error);
    }
};