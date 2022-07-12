const express = require('express');

const { book: ctrl } = require('../../controllers');
const { ctrlWrapper, validateBody, isValidId } = require('../../middleware');
const { joiSchema } = require('../../models/book');

const router = express.Router();

router.get('/');

router.get('/:bookId');

router.post('/add', ctrlWrapper(ctrl.addBook));

router.get('/feedback/:bookId');

router.post('/feedback/add/:bookId');

module.exports = router;
