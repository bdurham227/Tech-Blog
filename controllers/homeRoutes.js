const router = require('express').Router();
const { User, Post, Comment } = require('../models');




//get all users, posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],

        },
        {
          model: Comment,
          attributes: ["id", "user_id", "post_id", "comment_body"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    //serialize data so template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render('homepage', {
     
      posts,
      logged_in: req.session.logged_in
    });
    
  } catch (err) {
    res.status(500).json(err)
  }
});

//get post by id
router.get('/post/:id', async (req, res) => {
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
          attributes: ["id", "comment_body"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});


//login
router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');

  } catch (err) {
    res.status(500).json(err)
  }
});

//if not logged in redirect to signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})









module.exports = router;