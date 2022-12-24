const { Router } = require('express');
const authController = require('../Controllers/authController.js');

const router = Router();

router.post('/signup',authController.signup_post);
router.post('/login',authController.login_post);

module.exports = router;