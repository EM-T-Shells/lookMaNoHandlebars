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
      type: DataTypes.BOOLEAN,
    },
    pruned: {
      type: DataTypes.BOOLEAN,
    },
    fertilized: {
      type: DataTypes.BOOLEAN,
    },
    transplanted: {
      type: DataTypes.BOOLEAN,
    },            
    harvested: {
      type: DataTypes.BOOLEAN,
    },
    applied: {
      type: DataTypes.BOOLEAN,
    }, 
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'plant',
        key: 'id',
      },    
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
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
