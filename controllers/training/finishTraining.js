const { createError } = require('../../helpers');
const { Book } = require('../../models/book');
const { Training } = require('../../models/training');
const { User } = require('../../models/user');

const finishTraining = async (req, res) => {
  const {_id} = req.user;
  const { trainingID, factEndTraining, booksId } = req.body;

  const results = await Training.findByIdAndUpdate(
    { _id: trainingID },
    { factEndTraining, status: 'finished' },
    { new: true }
  );

  if (!results) {
    throw createError(404, "This training is not exist")
  }

  const {isTrainingActive} = await User.findByIdAndUpdate(_id, {isTrainingActive: false} , { new: true })

  await Book.updateMany(
    { _id: { $in: booksId } },
    { status: 'goingToRead' })

  res.json({
    user: {
      isTrainingActive
  },
  training: results

});
};

module.exports = finishTraining;
