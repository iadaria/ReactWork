const express = require('express');
const User = require('../models/User');
const { register, login, getUsers, getUserInfo } = require('../controllers/auth');
const advancedResults = require('../middleware/advancedResults') ;

const router = express.Router();

const { protect } = require('../middleware/auth');

// public
router.post('/users', register);
router.post('/sessions/create', login);
router.route('/api/protected/user-info')
    .get(protect, getUserInfo);

// protected
router
    .route('/api/protected/users/list')
    .post(protect, advancedResults(User), getUsers);


module.exports = router;