const router = require('express').Router();
const { Plant, User, Note, Task } = require('../models');
const withAuth = require('../utils/auth');

// get plant, by id, get notes, get tasks
router.get('/plants/:id', async (req, res) => {
  try {
    // get all notes and tasks
    const taskCheck = await Task.findAll({ where: { plant_id: req.params.id } })
    const noteCheck = await Note.findAll({ where: { plant_id: req.params.id } })
    let plantData;
    // the remaining if's check what data was returned
    if (!taskCheck.length && !noteCheck.length) {
      plantData = await Plant.findByPk(req.params.id, { include: [{ model: User, attributes: ["username"] }] });
    } else if (taskCheck.length && !noteCheck.length) {
      plantData = await Plant.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"]
          },
          {
            model: Task,
            where: { plant_id: req.params.id }
          }
        ]
      });
    } else if (!taskCheck.length && noteCheck.length) {
      plantData = await Plant.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"]
          },
          {
            model: Note,
            where: { plant_id: req.params.id },
          }
        ]
      });
    } else {
      plantData = await Plant.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"]
          },
          {
            model: Task,
            where: { plant_id: req.params.id }
          },
          {
            model: Note,
            where: { plant_id: req.params.id },
          }
        ]
      });
    }

    const plant = plantData.get({ plain: true });

    res.render('plant', { ...plant, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }
});

// homepage login
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

// login route --
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('dashboard');
});

module.exports = router;