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

router.get('/current', authenticate, ctrlWrapper(ctrl.progress));

router.post(
  '/',
  authenticate,
  validateBody(joiSchema.start),
  ctrlWrapper(ctrl.start),
  ctrlWrapper(ctrl.finishByBook)
);

//Ставит статус и время фактического завершения тренировки
router.get('/:idTraining/finish', authenticate, ctrlWrapper(ctrl.finish));

// Возвращает весь массив статистики, и массив с обновленными книгами в тренировке
router.patch(
  '/:idTraining/statistics',
  authenticate,
  validateBody(joiSchema.statistics),
  ctrlWrapper(ctrl.addStatistics),
  ctrlWrapper(ctrl.finishByBook)
);

module.exports = router;
