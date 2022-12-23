const router = require('express').Router();
const { Plant, User } = require('../models');
const withAuth = require('../utils/auth');

// when we log in, go to the all plants page
router.get('/', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/plants');
  //   return;
  // }
  res.render('homepage');
});
router.get('/profile', (req, res) => {
  res.render('profile')
})
module.exports = router;