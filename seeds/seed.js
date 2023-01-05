const sequelize = require('../config/connection');
const { Plant } = require('../models');
const { Task } = require('../models');
const { User } = require('../models');

const seedPlants = require('./plantData');
const seedTasks = require('./taskData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedPlants();

  await seedTasks();

  process.exit(0);
};

seedDatabase();