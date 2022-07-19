const express = require('express');

const { training: ctrl } = require('../../controllers');

const {
  authenticate,
  ctrlWrapper,
  validateBody,
  isValidId,
} = require('../../middleware');

const { joiSchema } = require('../../models/training');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.progress));

router.post('/start', authenticate, validateBody(joiSchema.start), ctrlWrapper(ctrl.start));
router.patch('/statistics', authenticate, validateBody(joiSchema.statistics), ctrlWrapper(ctrl.addStatistics));

module.exports = router;
