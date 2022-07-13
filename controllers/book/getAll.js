const { Book } = require("../../models/book")

const getAll = async (req, res) => {
  const {_id: owner} = req.user;

  const books = await Book.find({owner}, "-createdAt -updatedAt").populate("owner", "email name");
  res.json(books)
}

module.exports = getAll;