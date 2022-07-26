const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
          required: true,
        },
        pagesRead: {
          type: Number,
          min: 1,
          required: true,
        },
        days: {
          type: String,
          min: 1,
          required: true,
        },
        time: {
          type: String,
          min: 1,
          required: true,
        },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'inProcess', 'finished'],
      default: 'created',
    },
  },
  { versionKey: false, timestamps: true }
);

const trainingAddJoiSchema = Joi.object({
  booksId: Joi.array().items(Joi.string()).min(1).required(),
  startTraining: Joi.number().required(),
  endTraining: Joi.number().required(),
});

const statisticsAddJoiSchema = Joi.object({
  trainingID: Joi.string().required(),
  date: Joi.date().required(),
  pagesRead: Joi.number().required(),
  idBook: Joi.string().required(),
  days: Joi.string().required(),
  time: Joi.string().required(),
});

const finishDataJoiSchema = Joi.object({
  trainingID: Joi.string().required(),
  factEndTraining: Joi.number().required(),
  booksId: Joi.array().required(), //ошибка?
});

const Training = model('training', trainingSchema);

module.exports = {
  Training,
  joiSchema: {
    start: trainingAddJoiSchema,
    statistics: statisticsAddJoiSchema,
    finish: finishDataJoiSchema,
  },
};
