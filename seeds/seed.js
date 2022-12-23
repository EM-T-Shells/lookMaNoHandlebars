const sequelize = require('../config/connection');
const { Plant } = require('../models');
const { Tasks } = require('../models');

const plantData = require('./plantData.json');
const taskData = require('./taskData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Plant.bulkCreate(plantData, {
    individualHooks: true,
    returning: true,
  });

  await Tasks.bulkCreate(taskData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
