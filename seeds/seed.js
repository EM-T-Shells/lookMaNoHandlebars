const sequelize = require('../config/connection');
const { Plant } = require('../models');
const { Observation } = require('../models');
const { DailyTasks } = require('../models');

const plantData = require('./plantData.json');
const seedData = require('./seedData.json');
const observationData = require('./observationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
