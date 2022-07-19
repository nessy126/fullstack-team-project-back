const express = require('express');

const { book: ctrl } = require('../../controllers');
const {
  authenticate,
  ctrlWrapper,
  validateBody,
  isValidId,
} = require('../../middleware');
const { joiSchema } = require('../../models/book');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

// router.get('/:bookId', isValidId, ctrlWrapper() );

router.post('/', authenticate, ctrlWrapper(ctrl.addBook));

router.patch('/:bookId/feedback', authenticate, isValidId, ctrlWrapper(ctrl.addFeedBack) );

// router.get('/:bookId/feedback', isValidId );


module.exports = router;
