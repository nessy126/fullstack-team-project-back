const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { errorFunc } = require('../helpers');

const trainingSchema = Schema(
  {
    booksId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'book',
      },
    ],
    startTraining: {
      type: Number,
      required: [true, 'Training start date required.'],
    },
    endTraining: {
      type: Number,
      required: [true, 'Training end date required.'],
    },
    factEndTraining: {
      type: Number,
      default: null,
    },
    amountOfDays: {
      type: Number,
      min: [1, 'Training should be minimum 1 day long.'],
      default: null,
    },
    amountOfPages: {
      type: Number,
      min: 1,
      default: null,
    },
    pagesPerDay: {
      type: Number,
      min: 1,
      default: null,
    },
    statistics: [
      {
        date: {
          type: Date,
          min: 0,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        pagesRead: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const trainingAddJoiSchema = Joi.object({
  booksId: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .error(err => errorFunc(err)),
  startTraining: Joi.number()
    .required()
    .error(err => errorFunc(err)),
  endTraining: Joi.number()
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
