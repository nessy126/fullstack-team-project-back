const { createError } = require('../../helpers');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw createError(409, 'User with such e-mail is already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    name: user.name,
    email: user.email,
  });
};

module.exports = addUser;
