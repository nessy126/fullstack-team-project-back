const { Training } = require("../../models/training")
// еще не работает
// надо читать
// https://www.mongodb.com/docs/manual/reference/operator/update/push/
const addStatistics = async (req, res) => {
  const {_id}= req.user 
  const {trainingID, date, time, pagesRead} = req.body
  console.log(date, time, pagesRead);
  const training = await Training.findByIdAndUpdate({trainingID}, { $push: { statistics: {date, time, pagesRead} } } )

  res.json(training)
}

module.exports = addStatistics