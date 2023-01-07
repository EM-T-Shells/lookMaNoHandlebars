const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const noteRoutes = require('./noteRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);
router.use('/notes', noteRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
