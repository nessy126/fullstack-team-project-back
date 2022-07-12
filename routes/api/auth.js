const express = require('express');

const { auth: ctrl } = require('../../controllers');
const { ctrlWrapper, validateBody, isValidId } = require('../../middleware');
const { joiSchema } = require('../../models/book');

const router = express.Router();

// Если нужен будет
router.get('/');
//

router.get('/:userId');

router.post('/signup', ctrlWrapper(ctrl.signUp));

router.post('/login', ctrlWrapper(ctrl.signIn));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));

router.get('/logout', ctrlWrapper(ctrl.logOut));

module.exports = router;
