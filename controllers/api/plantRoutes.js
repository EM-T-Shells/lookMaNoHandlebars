const router = require('express').Router();
const { Plant } = require('../../models');
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
  console.log(req.body)
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
