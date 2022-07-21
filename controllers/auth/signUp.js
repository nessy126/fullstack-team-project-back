const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');

const { createError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw createError(409, 'User with such e-mail is already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = v4();
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Confirm email',
    html: `<a target='_blank' href='http://localhost:8000/api/users/verify/${verificationToken}'>Click to confirm your email</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
    },
    verificationToken,
  });
};

module.exports = addUser;
