const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    common_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    growth_habit: {
        // shrub, groundcover, herb, tree, climber
        type: DataTypes.STRING,
        allowNull: false,
    },
    life_cycle: {
        // annual or perennial
        type: DataTypes.STRING,
        allowNull: false,
    },
    light_reqs: {
        // Sun, partial sun, partial shade, shade
        type: DataTypes.STRING,
        allowNull: false,
    },
    water_reqs: {
        // Low medium high
        type: DataTypes.STRING,
        allowNull: false,
    },
    soil_reqs: {
        // rocky, caliche, sandy, loam, clay, silt
        type: DataTypes.STRING,
        allowNull: false,
    },
    mature_size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leaf_retention: {
        // Deciduous or evergreen
        type: DataTypes.STRING,
        allowNull: false,
    },
    bloom_time: {
        // a range like March - October
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_planted: {
        type: DataTypes.DATE,
        allowNull: false,
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
    modelName: 'plant',
  }
);

module.exports = Plant;
