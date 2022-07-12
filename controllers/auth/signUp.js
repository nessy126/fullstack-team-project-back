const { User } = require('../../models/user');

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(201).json({
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

module.exports = addUser;
