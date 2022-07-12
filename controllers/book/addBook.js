const { Book } = require('../../models/book');

const addBook = async (req, res, next) => {
  const { title, author, year, pageTotal } = req.body;

  const book = await Book.create({ title, author, year, pageTotal });

  res.status(201).json({
    title: book.title,
    author: book.author,
    year: book.year,
    pageTotal: book.pageTotal,
  });
};

module.exports = addBook;
