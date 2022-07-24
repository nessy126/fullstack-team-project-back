const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const addStatistics = async (req, res) => {
  const { trainingID, date, pagesRead, idBook, days, time } = req.body;

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

  const trainingStatistics = await Training.findById(trainingID);

  const books = await Book.updateOne(
    { _id: idBook },
    {
      $inc: {
        pageFinished: +pagesRead,
        'metrics.orders': 1,
      },
    }
  );

  res.json(trainingStatistics.statistics);
};

module.exports = addStatistics;
