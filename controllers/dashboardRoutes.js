const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//get all
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_title", "post_content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    //serialize data
    const posts = postData.map((post) => post.get({ plain: true }));

    //pass serialized data into template
    res.render('dashboard', {
      posts,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err)
  }
});

//edit
router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"],
        },
        {
          model: User,
          attributes: ["username"],
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: `No Post with the ID ${req.params.id} found` });
      return;
    }

    //created render post and handlebars template

  } catch (err) {
    res.status(500).json(err)
  }
});

//create new post
router.get('/create/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_title", "post_content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"],
        },
        {
          model: User,
          attributes: ["username"],
        }
      ]
    });
    //serialize data
    const post = postData.map((post) => post.get({ plain: true }));

    //res.render create post template
    res.render('create-post', {
      post,
      logged_in: true,
    })


  } catch (err) {
    res.status(500).json(err)
  }
})







module.exports = router;