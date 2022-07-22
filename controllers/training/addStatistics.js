const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const addStatistics = async (req, res) => {
  const { trainingID, date, time, pagesRead, idBook } = req.body;

  const training = await Training.updateOne(
    { _id: trainingID },
    {
      $push: {
        statistics: {
          $each: [{ date: date, time: time, pagesRead: pagesRead }],
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

  res.json(training);
};

module.exports = addStatistics;
