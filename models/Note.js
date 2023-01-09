const { Model, DataTypes } = require('sequelize'); // object mapping of sql db

const sequelize = require('../config/connection'); //connect to database

class Note extends Model {
  }
  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "plant",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "note",
    }
  );

module.exports = Note;
