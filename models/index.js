const User = require('./User');
const Task = require('./Task');
const Plant = require('./Plant');

User.hasMany(Task, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Task.belongsTo(User, {
    foreignKey: 'user_id'
  });

User.hasMany(Plant, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Plant.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { Task, Plant, User };
