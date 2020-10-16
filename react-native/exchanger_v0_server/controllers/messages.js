const admin = require("../config/admin");
// @desc    Create and send message by token
// @route   POST /api/v0/messages

// @access  Private
exports.sendMessage = async (req, res, next) => {
    try {
        const { token, title, message, screen } = req.body;

        setTimeout(async () => {
            const message = {
                token: token,
                notification: {
                    body: 'This is an FCM notification that displays an image!',
                    title: 'FCM Notification',
                },
                android: {
                    data: {
                        screen
                    },
                    notification: {
                        image: "image-url",
                    },
                },
            };

            admin
                .messaging()
                .send(message)
                .then(response => {
                    console.log('Successfully sent message:', response);
                })
                .catch(error => {
                    console.log('Error sending message:', error);
                });

            /* await admin.messaging().sendToDevice(
                [token],
                {
                    data: {
                        title,
                        message
                    }
                },
                {
                    contentAvailable: true,
                    priority: 'high'
                }
            ); */
            console.log("was sent".bgBlue);
        }, 5000);

        res.status(201).json({
            success: true,
            data: req.body
        });
    } catch (error) {
        console.log(error.red);
        next(error);
    }
};