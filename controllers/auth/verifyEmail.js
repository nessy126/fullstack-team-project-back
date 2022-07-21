const { createError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  //   console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, 'Something went wrong');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });
  res.redirect('http://localhost:3000/login');
  //   res.json({
  //     message: 'Verification success',
  //   });
};

module.exports = verifyEmail;
