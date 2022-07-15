const addTraining = require('./startTraining');
const trainingProgress = require('./trainingProgress');

module.exports = {
  start: addTraining,
  progress: trainingProgress,
};
