const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: '',
    },
    training: {
      type: Schema.Types.ObjectId,
      ref: 'training',
    },
  },
  { versionKey: false }
);

const registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const JoiSchema = {
  registerUser,
  loginUser,
};

const User = model('user', userSchema);

module.exports = {
  User,
  JoiSchema,
};
