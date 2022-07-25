const { Schema, model } = require('mongoose');
const Joi = require('joi');

const CODE_REGEXP = {
  RATING: /^[0-5]$/,
};

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['goingToRead', 'inReading', 'finished'],
      default: 'goingToRead',
    },
    pageTotal: {
      type: Number,
      required: true,
    },
    pageFinished: {
      type: Number,
      default: 0,
    },
    feedback: {
      rating: {
        type: Number,
        match: [CODE_REGEXP.RATING, 'wrong data'],
        default: null,
      },
      comment: {
        type: String,
        default: '',
      },
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
  status: Joi.string().valid('goingToRead', 'inReading', 'finished'),
  pageTotal: Joi.number().required(),
  pageFinished: Joi.number(),
  feedback: Joi.object({
    rating: Joi.number(),
    comment: Joi.string(),
  }),
});

const Book = model('book', bookSchema);

module.exports = {
  Book,
  joiSchema: {
    book: JoiBookSchema,
  },
};
