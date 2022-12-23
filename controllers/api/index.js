const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const taskRoutes = require('./taskRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);
// router.use('/tasks', taskRoutes);
// router.use('/notes', noteRoutes);

module.exports = router;
