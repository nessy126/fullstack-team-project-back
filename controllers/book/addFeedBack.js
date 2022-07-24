const { Book } = require('../../models/book');

const addFeedBack = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;

  const bookReview = await Book.findByIdAndUpdate(
    bookId,
    {
      feedback: req.body,
    },
    {
      new: true,
    }
  );

  res.json({
    bookReview,
  });
};

module.exports = addFeedBack;
