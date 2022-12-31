const User = require('./User');
const Plant = require('./Plant');
const Task = require('./Task');

User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Plant.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.hasMany(Task, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
//   });
  
// Task.belongsTo(User, {
//     foreignKey: 'user_id'
//   });

module.exports = { User, Plant };
