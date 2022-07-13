const { Book } = require('../../models/book');

const addBook = async (req, res, next) => {
  const {_id: owner} = req.user;
  const { title, author, year, pageTotal } = req.body;

  const book = await Book.create({ title, author, year, pageTotal, owner });

  res.status(201).json(book);
};

module.exports = addBook;
