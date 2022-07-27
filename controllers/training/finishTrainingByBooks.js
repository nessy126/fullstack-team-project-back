const { Model } = require('mongoose');
const { createError } = require('../../helpers');
const { Training } = require('../../models/training');
const { User } = require('../../models/user');

const finishTrainingByBooks = async (req, res) => {
  const { _id } = req.user;
  const { idTraining } = req.params;

  const results = await Training.findByIdAndUpdate(
    { _id: idTraining },
    { status: 'finished' },
    { new: true }
  ).populate('booksId');

  if (!results) {
    throw createError(404, 'This training is not exist');
  }

  const { isTrainingActive } = await User.findByIdAndUpdate(
    _id,
    { isTrainingActive: false },
    { new: true }
  );


  res.json({
    training: results,
     user: {isTrainingActive: isTrainingActive}
  })
};

module.exports = finishTrainingByBooks
