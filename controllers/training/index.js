const addTraining = require('./startTraining');
const trainingProgress = require('./trainingProgress');
const addStatistics = require('./addStatistics');

module.exports = {
  start: addTraining,
  progress: trainingProgress,
  addStatistics
};

