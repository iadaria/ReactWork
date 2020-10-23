const express = require('express');
const Transaction = require('../models/Transaction');
const {
    getTransactions, 
    createTransaction,
    addCurrentUserToQuery } = require('../controllers/transaction');
const advancedResults = require('../middleware/advancedResults') ;

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
    .get(
        protect,
        addCurrentUserToQuery,
        advancedResults(Transaction),
        getTransactions
    )
    .post(protect, createTransaction);

module.exports = router;