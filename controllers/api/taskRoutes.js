const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

// add task
router.post('/', withAuth, async (req, res) => {
    console.log("task request body: ", req.body.watered, req.body.harvested, req.body.fertilized)
    try {
      const newTask = await Task.create({
        ...req.body,
        plant_id: req.body.plant_id,
      });
      res.status(200).json(newTask);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update task
router.put('/:id', withAuth, async (req, res) => {
  try {
    const taskData = await Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!taskData) {
      res.status(404).json({ message: 'No task found with this id!'});
      return;
    }
    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;