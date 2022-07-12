const express = require('express');

const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper, validateBody} = require('../../middleware');
const { JoiSchema } = require('../../models/user');

const router = express.Router();

// Если нужен будет
router.get('/');


router.get('/:userId');

router.post('/signup', validateBody(JoiSchema.registerUser), ctrlWrapper(ctrl.signUp));

router.post('/login', validateBody(JoiSchema.loginUser), ctrlWrapper(ctrl.signIn));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

router.get('/logout', ctrlWrapper(ctrl.logOut));

module.exports = router;
