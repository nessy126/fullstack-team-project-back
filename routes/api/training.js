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

router.post(
  '/start',
  authenticate,
  validateBody(joiSchema.start),
  ctrlWrapper(ctrl.start)
);

//Ставит статус и время фактического завершения тренировки
router.patch(
  '/finish',
  authenticate,
  validateBody(joiSchema.finish),
  ctrlWrapper(ctrl.finish)
);

// Возвращает весь массив статистики, и массив с обновленными книгами в тренировке
router.patch(
  '/statistics',
  authenticate,
  validateBody(joiSchema.statistics),
  ctrlWrapper(ctrl.addStatistics)
);

module.exports = router;
