const router = require('express').Router();
const { Plant, User, Note, Task } = require('../models');
const withAuth = require('../utils/auth');

// get plant, by id, get notes, get tasks 
router.get('/plants/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }]
    });
    const plant = plantData.get({ plain: true });
    // get notes
    const allNotes = await Note.findAll({ where: {
      plant_id: req.params.id, },
      include: [{ model: User, attributes: ["username"] }] 
    });
    const notes = allNotes.map((note) =>
    note.get({ plain: true }));
    // get tasks
    // const allTasks = await Task.findAll( { where: {
    //   plant_id: req.params.id, },
    //  include: [ { model: User, attributes: ["username"] }]
    // });
    // const tasks = allTasks.map((task) =>
    // task.get({ plain: true }));
      // harden with user id to use multiple users

    // const task = allTasks[0].get({ plain: true });
    // console.log("tasks", task)

    res.render('plant', { ...plant, notes, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all plants
router.get('/', async (req, res) => {
    try {
      const allPlants = await Plant.findAll( { include: [ { model: User }]});
      const plants = allPlants.map((plant) =>
      plant.get({ plain: true }));
      console.log("plants", plants)
      res.render('homepage', { plants, loggedIn: req.session.logged_in })
    } catch (err) {
      res.status(400).json(err);
    }
  })

// get user's plants (dashboard)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
       include: [{ model: Plant }]
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', { ...user, loggedIn: req.session.logged_in });

  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;