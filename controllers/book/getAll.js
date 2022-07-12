const { Book } = require("../../models/book")

const getAll = async (req, res) => {
  const books = await Book.find()
  res.json(books)
}

module.exports = getAll;