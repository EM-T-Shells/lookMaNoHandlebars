const router = require('express').Router();
const { Plant, Task } = require('../../models');
const withAuth = require('../../utils/auth');

// update plant
router.put('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!'});
      return;
    }
    res.status(200).json(plantData);
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

// show completed tasks
router.get('/', async (req, res) => {
  try {
    const allTasks = await Task.findAll( { include: [ { model: User }]});
    const tasks = allTasks.map((task) =>
    task.get({ plain: true }));
    res.render('plant', { tasks, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(400).json(err);
  }
})

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
