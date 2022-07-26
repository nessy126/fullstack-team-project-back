const express = require('express');
const router = express.Router();

const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper, validateBody, authenticate } = require('../../middleware');
const { JoiSchema } = require('../../models/user');

router.post(
  '/signup',
  validateBody(JoiSchema.registerUser),
  ctrlWrapper(ctrl.signUp)
);

router.post(
  '/login',
  validateBody(JoiSchema.loginUser),
  ctrlWrapper(ctrl.login)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.current));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

//
router.post('/logout', authenticate, ctrlWrapper(ctrl.logOut));

module.exports = router;
