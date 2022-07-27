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
        dateNow: {
          type: Date,
          required: true,
        },
        pagesRead: {
          type: Number,
          min: 1,
          required: true,
        },
        dateShow: {
          type: String,
          min: 10,
          required: true,
        },
        time: {
          type: String,
          min: 8,
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
  date: Joi.string().required(),
  time: Joi.string().required(),
  pagesRead: Joi.number().required(),
});

const Training = model('training', trainingSchema);

module.exports = {
  Training,
  joiSchema: {
    start: trainingAddJoiSchema,
    statistics: statisticsAddJoiSchema,
  },
};
