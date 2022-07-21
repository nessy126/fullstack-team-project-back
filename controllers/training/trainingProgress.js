const { Training } = require('../../models/training');
const { Book } = require('../../models/book');

const trainingProgress = async ({ user }, res) => {
  const { _id } = user;

  const result = await Training.findOne({ owner: _id, status: 'inProcess' }, '-createdAt -updatedAt')
  .populate("booksId", '-createdAt -updatedAt')
  
  res.status(200).json(result);
};

module.exports = trainingProgress;
