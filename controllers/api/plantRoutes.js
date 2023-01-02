const router = require('express').Router();
const { Plant, Task, Note } = require('../../models');
const withAuth = require('../../utils/auth');

// update plant
router.put('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!'});
      return;
    }
    res.status(200).json(planttData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create plant
router.post('/', withAuth, async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add task
router.post('/', withAuth, async (req, res) => {
  console.log("task request body: ", req.body)
  try {
    const newTask = await Task.create({
      ...req.body,
      user_id: req.session.user_id,
      plant_id: req.body.plant_id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add note
router.post('/', withAuth, async (req, res) => {
  console.log("note request body: ", req.body)
  try {
    const newNote = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete plant
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
