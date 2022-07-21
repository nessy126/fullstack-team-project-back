const Joi = require('joi');
const { createError, sendMail } = require('../../helpers');
const { User, JoiSchema } = require('../../models/user');

const resendVerifyEmail = async (req, res, next) => {
  const { error } = JoiSchema.verifyEmailSchema.validate(req.body);
  //   console.log(req.body);

  if (error) {
    // console.log(error);
    throw createError(400, 'missing required filed email');
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, 'Verification has already been passed');
  }
  const mail = {
    to: email,
    subject: 'Confirm email',
    html: `<a target='_blank' href='http://localhost:8000/api/users/verify/${user.verificationToken}'>Click to confirm your email</a>`,
  };
  sendMail(mail);

  res.json({
    message: 'Verification was send',
    user,
  });
};

module.exports = resendVerifyEmail;
