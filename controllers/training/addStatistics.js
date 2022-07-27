const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const addStats = (pagesRead, training) => {
  // startInd становится undefind если нет книг со статусо в прочтении
  let startInd = training.booksId.findIndex(el => el.status === 'inReading');

  if (startInd === -1) {
    return "finish";
  }

  let pageLeft = pagesRead;

  const booksUpdate = [];
  // ЗАВЕРШЕНИЕ ТРЕНИРОВКИ
  //хочу сделать сравнение, что если (amountOfBook - 1) === startInd, то 
  // return "finish";?
  const amountOfBook = training.booksId.length 

  for (; startInd < training.booksId.length; startInd++) {
    const chooseBook = training.booksId[startInd];
    booksUpdate.push(chooseBook);

    const inbookPageLeft = chooseBook.pageTotal - chooseBook.pageFinished;
    if (inbookPageLeft > pageLeft) {
      chooseBook.pageFinished += pageLeft;
      break;
    } else if (inbookPageLeft === pageLeft) {
      chooseBook.pageFinished += pageLeft;
      chooseBook.status = 'finished';
      if ((amountOfBook - 1) === startInd) {
        return {next: "updateAndFinish",
        books: booksUpdate
      };
      }
      break;
    } else if (inbookPageLeft < pageLeft) {
      chooseBook.pageFinished = chooseBook.pageTotal
      chooseBook.status = 'finished';
      pageLeft -= inbookPageLeft;

      if ((amountOfBook - 1) === startInd) {
        return {next: "updateAndFinish",
        books: booksUpdate
      };
      }
    }
  }
  console.log(booksUpdate)
  return booksUpdate;
};

const addStatistics = async (req, res, next) => {
  const { dateNow, pagesRead, dateShow, time } = req.body;
  const { idTraining } = req.params;

  const training = await Training.findByIdAndUpdate(
    { _id: idTraining },
    {
      $push: {
        statistics: {
          $each: [{ dateNow, pagesRead, dateShow, time }],
        },
      },
    },
    {new: true}
  )
  .populate('booksId', '-createdAt -updatedAt');

  const booksUpdate = addStats(pagesRead, training);

    if (booksUpdate === "finish") {
      next()
    } else if (Array.isArray(booksUpdate)) {

      const promiseAll = booksUpdate.map(book => {
        return Book.findByIdAndUpdate(book._id, {status: book.status, pageFinished: book.pageFinished})
      })
      await Promise.all(promiseAll)

      res.json({
        training: training,
        books: booksUpdate,
        user: {isTrainingActive: true}
      });
    } else {

      const promiseAll = booksUpdate.books.map(book => {
        return Book.findByIdAndUpdate(book._id, {status: book.status, pageFinished: book.pageFinished})
      })

      await Promise.all(promiseAll)
      next()  
};
}

module.exports = addStatistics;
