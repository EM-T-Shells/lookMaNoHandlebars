const { Note, Plant } = require('../models');

const notedata =
[
  {
    "note": "the leaves were dry. so i watered the soil.",
    "plant_id": "1",
    "user_id": "1"
  }
]

const seedNotes = () => Note.bulkCreate(notedata);

module.exports = seedNotes;