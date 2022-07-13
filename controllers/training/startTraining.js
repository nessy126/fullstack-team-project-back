const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const { createError } = require('../../helpers/');

const addTraining = async (req, res, next) => {
  const { books, end } = req.body;
  let { start } = req.body;

  const booksList = await Book.find({ _id: { $in: books } });
  const amountOfPages = booksList.filter(
    el => el.status === 'inReading'
  ).length;

  const training = await Training.create({
    books,
    start,
    end,
  });

  if (!training) {
    throw createError(404);
  }

  const setStatus = async id => {
    const result = await Book.findByIdAndUpdate(
      { _id: id },
      { status: 'inReading' }
    );
    if (!result) {
      throw createError(404);
    }
  };

  training.books.forEach(el => {
    setStatus(el);
  });

  res.status(201).json({ message: 'Training start' });
};

module.exports = addTraining;
