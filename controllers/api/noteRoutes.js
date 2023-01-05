const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');

// create note
router.post('/', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const newNote = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
      plant_id: req.body.plant_id,
    });
    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

// show notes
router.get('/', async (req, res) => {
  try {
    const allNotes = await Note.findAll( { include: [ { model: User }]});
    const notes = allNotes.map((note) =>
    note.get({ plain: true }));
    res.render('note-details', { notes, loggedIn: req.session.logged_in })
  } catch (err) {
    res.status(400).json(err);
  }
})

// // delete note
// router.delete('/:id', withAuth, async (req, res) => {
//   try{
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this id! '});
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// })

module.exports = router;