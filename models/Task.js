const { Model, DataTypes } = require('sequelize'); // object mapping of sql db
const sequelize = require('../config/connection'); //connect to database

class Task extends Model {}


Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    watered: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    pruned: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    fertilized: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    transplanted: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    harvested: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    applied: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'plant',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;
