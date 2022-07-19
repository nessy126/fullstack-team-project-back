const current = async (req, res) => {
  const { name, email } = req.user;
  // console.log(re.user)

  res.json({
    name,
    email,
  });
};

module.exports = current;
