const current = async (req, res) => {
  const { name, email } = req.user;

  console.log(req.user);

  res.json({
    name,
    email,
  });
};

module.exports = current;
