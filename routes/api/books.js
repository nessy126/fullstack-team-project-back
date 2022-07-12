const express = require('express');

const { book: ctrl } = require('../../controllers');
const { authenticate, ctrlWrapper, validateBody, isValidId } = require('../../middleware');
const { joiSchema } = require('../../models/book');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll) );

router.get('/:bookId', isValidId, ctrlWrapper() );

router.post('/', ctrlWrapper(ctrl.addBook));

router.get('/feedback/:bookId', isValidId );

router.post('/feedback/add/:bookId', isValidId );

module.exports = router;