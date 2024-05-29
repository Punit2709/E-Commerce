const express = require('express');
const {isAuthenticatedUser} = require('../middleware/authentication')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails } = require('../controller/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);


router.route('/logout').get(logoutUser);

module.exports = router;