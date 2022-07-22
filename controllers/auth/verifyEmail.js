const { createError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, 'Something went wrong');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.redirect(
    'https://book-reader-team-project.herokuapp.com/login'
    // 'http://localhost:3000/login'
  );
};

module.exports = verifyEmail;
