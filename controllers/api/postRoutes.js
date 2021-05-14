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
})





module.exports = router;