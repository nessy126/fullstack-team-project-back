const { Training } = require('../../models/training');
const { Book } = require('../../models/book');
const { User } = require('../../models/user');

const { createError } = require('../../helpers/');

const addTraining = async ({ user: { _id }, body }, res) => {
  const { booksId, endTraining, startTraining } = body;
  const booksList = await Book.find({ _id: { $in: booksId } });

  const amountOfDays = Math.ceil(
    (endTraining - startTraining) / (1000 * 3600 * 24)
  );

  const amountOfPages = booksList.reduce(
    (sum, { pageTotal }) => sum + pageTotal,
    0
  );

  const pagesPerDay = Math.round(amountOfPages / amountOfDays);

  const training = await Training.create({
    ...body,
    owner: _id,
    amountOfDays,
    amountOfPages,
    pagesPerDay,
  });

  if (!training) {
    throw createError(404);
  }

  const setStatus = await Book.updateMany(
    { _id: { $in: training.booksId } },
    { status: 'inReading' }
  );

  if (!setStatus) {
    throw createError(404);
  }

  await User.findByIdAndUpdate(_id, { isTrainingActive: true });

  res.status(201).json(training);
};

module.exports = addTraining;
