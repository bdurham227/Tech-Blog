const { Post, User, Comment } = require('../../models');

const router = require('express').Router();


//get all 
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_content", "date_created"],
      order: [["date_created", "DESC" ]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts);


  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {

    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_content", "date_created"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: `No Post with the ID ${req.params.id} found `});
      return;
    }

    const post = postData.get({ plain: true });
    res.status(200).json(post);



  } catch (err) {
    res.status(500).json(err)
  }
})










module.exports = router;