const express = require('express');
const Transaction = require('../models/Transaction');
const {
    getTransactions } = require('../controllers/transaction');
const advancedResults = require('../middleware/advancedResults') ;

const router = express.Router();

router.route('/')
    .get(advancedResults(Transaction), getTransactions);

module.exports = router;