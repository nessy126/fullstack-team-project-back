const current = async (req, res) => {
  const { name, email, isTrainingActive  } = req.user;


  res.json({
    name,
    email,
    isTrainingActive 

  });
};

module.exports = current;
