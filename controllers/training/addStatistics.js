const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const addStatistics = async (req, res) => {
  const { trainingID, date, pagesRead, idBook, days, time, totalPage } = req.body;

  const training = await Training.updateOne(
    { _id: trainingID },
    {
      $push: {
        statistics: {
          $each: [{ date: date, pagesRead: pagesRead, days: days, time: time }],
        },
      },
    }
  );

  const books = await Book.updateOne(
    { _id: idBook },
    {
      $inc: {
        pageFinished: +pagesRead,
        'metrics.orders': 1,
      },
    }
  );

  const result = await Training.findOne(
    { _id: trainingID },
    '-createdAt -updatedAt -owner'
  ).populate('booksId', '-createdAt -updatedAt');

  res.json(result);
};

module.exports = addStatistics;
