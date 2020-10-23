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

TransactionSchema.post('save', async function() {
    const _amount = this.amount;
    const _sender = await this.model('User').findById(this.sender); console.log('_sender', {sender: _sender});
    const _balance = _sender.balance;
    this.balance = _balance - _amount;

    const recipient = await this.model('User').findById(this.recipient, function(err, doc) {
        doc.balance = doc.balance + _amount;
    }); 

    await this.model('User').findById(this.sender, function(err, doc) {
        doc.balance = doc.balance - _amount;
    }); 
    
    /* console.log('recipient', {recipient});
    recipient.update({

    })

    try {
        console.log('sender', {sender: this.sender});
    } catch (err) {
        console.log(err);
    } */

    //next(); if pre
});

module.exports = mongoose.model('Transaction', TransactionSchema);