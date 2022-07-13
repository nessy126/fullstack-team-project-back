const express = require('express');
const router = express.Router();

const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper, validateBody, authenticate} = require('../../middleware');
const { JoiSchema } = require('../../models/user');

// Если нужен будет
// router.get('/');

// router.get('/:userId');

router.post('/signup', validateBody(JoiSchema.registerUser), ctrlWrapper(ctrl.signUp)); // работает

router.post('/login', validateBody(JoiSchema.loginUser), ctrlWrapper(ctrl.login)); // работает

// router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

// router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logOut));

module.exports = router;
