const { Task } = require('../models');

const taskdata = [
  {
    "common_name": "Yellow Bells",
    "scientific_name": "Tecoma stans",
    "growth_habit": "Shrub",
    "life_cycle": "Perennial",
    "light_reqs": "Full sun, Part Shade",
    "water_reqs": "Low"
  }
];

const seedTasks = () => Task.bulkCreate(taskdata);

module.exports = seedTasks;