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

Plant.hasMany(Note, {
  foreignKey: 'plant_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(Plant, {
  foreignKey: 'plant_id'
});

Plant.hasOne(Task, {
  foreignKey: 'plant_id',
  onDelete: 'CASCADE'
});

Task.belongsTo(Plant, {
  foreignKey: 'plant_id'
});

// Note.belongsToMany(User, { through: Plant });

// Task.belongsToMany(User, { through: Plant });


module.exports = { User, Plant, Note, Task };
