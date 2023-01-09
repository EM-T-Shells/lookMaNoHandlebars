const sequelize = require('../config/connection');
const { Plant, Task, User, Note } = require('../models');

const userData = require('./userData.json')
const plantData = require('./plantData.json');
const taskData = require('./taskData.json')
const noteData = require('./noteData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const plant of plantData) {
    await Plant.create({
      ...plant,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  };

  for (const task of taskData) {
    await Task.create({
      task,
      // plant_id: plant[Math.floor(Math.random() * plant.length)].id,
    })
  };

  for (const note of noteData) {
    await Note.create({
      ...note,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  };


  process.exit(0);
};

seedDatabase();