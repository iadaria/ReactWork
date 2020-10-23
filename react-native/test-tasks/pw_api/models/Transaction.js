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
    const amountPW = this.amount;

    // Get the User(sender) current balance
    const senderObj = await this.model('User').findById(this.sender);

    console.log('[TransactionSchema] sender before transaction'.bgBlue, { sender: senderObj });

    const beforeSenderBalancePW = senderObj.balance;
    const afterSenderBalancePW = beforeSenderBalancePW - amountPW;
    // Change current balance in the transaction
    this.balance = afterSenderBalancePW;

    try {
        // The recipient account will be credited (+PW)
        await this.model('User').findById(this.recipient, function (err, doc) {
            doc.balance = doc.balance + amountPW;
        });

        // The payee account debited (PW--)
        await senderObj.updateOne({
            balance: afterSenderBalancePW
        });
    } catch (err) {
        console.log(err);
    }

});

module.exports = mongoose.model('Transaction', TransactionSchema);