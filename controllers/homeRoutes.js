const router = require('express').Router();
const { Plant, User } = require('../models');
const withAuth = require('../utils/auth');

// get plant by id 
router.get('/plants/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }]
    });

    const plant = plantData.get({ plain: true });
    console.log(plant);

    res.render('plant', {
      ...plant,
      loggedIn: req.session.logged_in
    });
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