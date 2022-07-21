const addStatistics = async (req, res) => {
  const {_id}= req.user 
  console.log(_id);

  res.json("addStatistics")
}

module.exports = addStatistics