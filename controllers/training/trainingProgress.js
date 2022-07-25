const { Training } = require('../../models/training');
const { createError } = require('../../helpers');

const trainingProgress = async ({ user }, res) => {
  const { _id } = user;
  const result = await Training.findOne(
    { owner: _id, status: "inProcess" },
    '-createdAt -updatedAt -owner'
  ).populate('booksId', '-createdAt -updatedAt');

  if (!result) {
    throw createError(404);
  }

  res.status(200).json(result);
};

module.exports = trainingProgress;
