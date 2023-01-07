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
      console.log("#########err############", err)
      res.status(400).json(err);
    }
  });

  module.exports = router;