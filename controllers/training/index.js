const addTraining = require('./startTraining');
const trainingProgress = require('./trainingProgress');
const addStatistics = require('./addStatistics');
const finishTraining  = require('./finishTraining');

module.exports = {
  start: addTraining,
  progress: trainingProgress,
  addStatistics,
  finish: finishTraining 
};

