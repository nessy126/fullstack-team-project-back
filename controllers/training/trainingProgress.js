const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const trainingProgress = async ({ user }, res) => {
  const { _id } = user;
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

  const responseObj = {
    booksId,
    booksList,
    amountOfBooks,
    booksLeft,
    startTraining,
    endTraining,
    amountOfPages,
    pagesPerDay,
    statistics,
  };

  res.status(200).json(responseObj);
};

module.exports = trainingProgress;
