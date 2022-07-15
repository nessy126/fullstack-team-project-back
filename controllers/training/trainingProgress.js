const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const trainingProgress = async ({ user: { _id } }, res) => {
  const {
    booksId,
    startTraining,
    endTraining,
    amountOfPages,
    pagesPerDay,
    statistics,
  } = await Training.findOne({ owner: _id, isActive: true });

  const booksList = await Book.find(
    { _id: { $in: booksId } },
    '-createdAt -updatedAt'
  );

  const amountOfBooks = booksList.length;

  const booksLeft = booksList.filter(
    ({ status }) => status === 'inReading'
  ).length;

  res.status(200).json({
    booksId,
    booksList,
    amountOfBooks,
    booksLeft,
    startTraining,
    endTraining,
    amountOfPages,
    pagesPerDay,
    statistics,
  });
};

module.exports = trainingProgress;
