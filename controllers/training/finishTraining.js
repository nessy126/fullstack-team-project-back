const { createError } = require('../../helpers');
const { Training } = require('../../models/training');
const { User } = require('../../models/user');

const finishTraining = async (req, res) => {
  const {_id} = req.user;
  console.log("id");
  const { trainingID, factEndTraining } = req.body;

  const results = await Training.findByIdAndUpdate(
    { _id: trainingID },
    { factEndTraining, status: 'finished' },
    { new: true }
  );

  if (!results) {
    throw createError(404, "This training is not exist")
  }

  const updateUserTraining = await User.findByIdAndUpdate(_id, {isTrainingActive: false} , { new: true })
  console.log(updateUserTraining);


  res.json({
    user: {
    isTrainingActive: false
  },
  training: results

});
};

module.exports = finishTraining;
