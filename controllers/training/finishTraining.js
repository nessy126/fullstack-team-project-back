const { createError } = require('../../helpers');
const { Book } = require('../../models/book');
const { Training } = require('../../models/training');
const { User } = require('../../models/user');

const finishTraining = async (req, res) => {
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

  /////////////////////

  const booksUpdate = results.booksId
    .filter(book => book.status === 'inReading')
    .map(book => book._id);

  await Book.updateMany(
    { _id: { $in: booksUpdate } },
    { status: 'goingToRead' }
  );

  res.json({
    user: {
      isTrainingActive,
    },
    training: results,
  });
};

module.exports = finishTraining;
