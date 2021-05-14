const router = require('express').Router();
const { Comment } = require('../../models');


//get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});

    res.status(200).json(commentData);



  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    
    const commentData = await Comment.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    });

    res.status(200).json(commentData);


  } catch (err) {
    res.status(500).json(err)
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: `No Comment with the ID ${req.params.id} found` });
      return;
    }

    res.status(204).json(commentData);



  } catch (err) {
    res.status(500).json(err)
  }
})





module.exports = router;