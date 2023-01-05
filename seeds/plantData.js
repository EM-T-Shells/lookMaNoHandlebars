const { Plant } = require('../models');

const plantdata = [
  {
    "common_name": "Yellow Bells",
    "scientific_name": "Tecoma stans",
    "growth_habit": "Shrub",
    "life_cycle": "Perennial",
    "light_reqs": "Full sun, Part Shade",
    "water_reqs": "Low"
  }
];

const seedPlants = () => Plant.bulkCreate(plantdata);

module.exports = seedPlants;