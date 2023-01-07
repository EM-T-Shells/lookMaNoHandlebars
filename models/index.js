const User = require('./User');
const Plant = require('./Plant');
const Note = require('./Note');
const Task = require('./Task');

User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Plant.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(User, {
  foreignKey: 'user_id'
});

Plant.hasMany(Note, {
  foreignKey: 'plant_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(Plant, {
  foreignKey: 'plant_id'
});

User.hasMany(Task, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Task.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Plant, Note, Task };
