const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

TransactionSchema.post('save', async function () {
    let session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const newSenderBalancePW = this.sender.balance - this.amount;
        const newRecipientBalancePW = this.recipient.balance + this.amount;

        this.balance = newSenderBalancePW;
        await this.model('User').findByIdAndUpdate(this.sender, {
            balance: newSenderBalancePW
        });
        await this.model('User').findByIdAndUpdate(this.recipient, {
            balance: newRecipientBalancePW
        });

        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }

});

module.exports = mongoose.model('Transaction', TransactionSchema);