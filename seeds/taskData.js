const { Task } = require('../models');

const taskdata = [
  {
    "watered": "True",
    "pruned": "False",
    "fertilized": "False",
    "transplanted": "False",
    "harvested": "False",
    "applied": "True"
  }
];

const seedTasks = () => Task.bulkCreate(taskdata);

module.exports = seedTasks;