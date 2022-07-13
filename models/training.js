const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { errorFunc } = require('../helpers');

const trainingSchema = Schema(
  {
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
    start: {
      type: Date,
      required: [true, 'Training start date required.'],
    },
    end: {
      type: Date,
      required: [true, 'Training end date required.'],
    },
    amountOfDays: {
      type: Number,
      min: [1, 'Training should be minimum 1 day long.'],
    },
    amountOfPages: {
      type: Number,
      min: 1,
    },
    pagesPerDay: {
      type: Number,
      min: 1,
    },
    statistics: [
      {
        date: {
          type: Date,
          min: 0,
          required: true,
        },
        pagesRead: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const trainingAddJoiSchema = Joi.object({
  books: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .error(err => errorFunc(err)),
  start: Joi.date()
    .required()
    .error(err => errorFunc(err)),
  end: Joi.date()
    .required()
    .error(err => errorFunc(err)),
});

const Training = model('training', trainingSchema);

module.exports = {
  Training,
  joiSchema: {
    start: trainingAddJoiSchema,
  },
};
