const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const { createError } = require('../../helpers/');

const trainingProgress = async (req, res, next) => {
  const { training } = req.user;

  const { books, start, end, amountOfDays, amountOfPages, pagesPerDay } =
    await Training.findById({ _id: training });

  const booksList = await Book.find({ _id: { $in: books } });

  const amountOfBooks = books.length;

  const booksLeft = booksList.filter(el => el.status === 'inReading').length;

  res.status(200).json({ booksList, amountOfBooks, booksLeft, end });
};

module.exports = trainingProgress;
