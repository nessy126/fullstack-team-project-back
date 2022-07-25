const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const addStats = (pagesRead, training) => {

  let startInd = training.booksId.findIndex(el => el.status === "inReading");
  let pageLeft = pagesRead;
  const booksUpdate = [];

  for ( ; startInd < training.booksId.length; startInd++) {
    const chooseBook = training.booksId[startInd]
    booksUpdate.push(chooseBook)

    const bookPageLeft = chooseBook.pageTotal - chooseBook.pageFinished; //10
    if (bookPageLeft > pageLeft) {
      chooseBook.pageFinished += pageLeft;
      break
  
    } else if (bookPageLeft === pageLeft) {
      chooseBook.pageFinished += pageLeft;
      chooseBook.status = 'finished';
      break
  
    } else if (bookPageLeft < pageLeft) {
      chooseBook.pageFinished = pagesLeft;
      chooseBook.status = 'finished';
      pageLeft -= bookPageLeft
    }
  }

  return booksUpdate;
}

const addStatistics = async (req, res) => {
  const { trainingID, date, pagesRead, idBook, days, time, pageTotal } = req.body;

  const training = await Training.findByIdAndUpdate({trainingID}, {statistics})
  .populate('booksId', '-createdAt -updatedAt');

  const booksUpdate = addStats(pagesRead, training)
  const updatedBook = await Book.updateMany({booksUpdate})
  
  
//   if (pageTotal === pagesRead ) {
//     const training = await Training.updateOne(
//       { _id: trainingID },
//       {
//         $push: {
//           statistics: {
//             $each: [{ date: date, pagesRead: pagesRead, days: days, time: time }],
//           },
//         },
//       }
//       ).populate('booksId', '-createdAt -updatedAt');
//       return training;
//     } else {
//       const training = await Training.updateOne(
//         { _id: trainingID },
//         {
//           $push: {
//             statistics: {
//               $each: [{ date: date, pagesRead: pagesRead, days: days, time: time }],
//             },
//           },
//         }
//         )
//         // .populate('booksId', '-createdAt -updatedAt');
//         console.log(trainingID);
//   return training;
// }

//  console.log(training);

//   const books = await Book.updateOne(
//     { _id: idBook },
//     {
//       $inc: {
//         pageFinished: +pagesRead,
//         'metrics.orders': 1,
//       },
//     }
//   );

  // const result = await Training.findOne(

  //   { _id: trainingID },
  //   '-createdAt -updatedAt -owner'
  // ).populate('booksId', '-createdAt -updatedAt');
  res.json({
    training,
    updatedBook
  });
};

module.exports = addStatistics;
