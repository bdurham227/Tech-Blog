const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User } = require('../models');


//get all
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "post_title", "post_content", "date_created"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "post_id", "user_id", "comment_body"],
//           include: {
//             model: User,
//             attributes: ["id", "username"],
//           }
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });
//     //serialize data
//     // const posts = postData.map((post) => post.get({ plain: true }));
//     const posts = postData.map(post => post.get({ plain: true }));
//     console.log(posts);

//     //pass serialized data into template
//     res.render('dashboard', {
//       posts,
//       user_id: posts.user_id,
//       logged_in: true
//     });

//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "comment_body"]
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      // layout: 'dashboard',
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.redirect('login');
  }
});


//edit
router.get('/edit/:id', async (req, res) => {
  try {
    // const postData = await Post.findOne({
    //   where: {
    //     id: req.session.user_id,
    //   },
    const postData = await Post.findByPk(req.params.id);
    //   attributes: ["id", "post_title", "post_content", "date_created"],
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: ["id", "post_id", "user_id", "comment_body"],
    //       include: {
    //         model: User,
    //         attributes: ["username"],
    //       },
    //     },
    //     {
    //       model: User,
    //       attributes: ["username"],
    //     }
    //   ]
    // });

    if (!postData) {
      res.status(404).json({ message: `No Post with the ID ${req.params.id} found` });
      return;
    }
    const post = postData.get({ plain: true });
    console.log(post);
    //created render post and handlebars template
    res.render('edit-post', {
      post,
      logged_in: true,
    })

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
});









module.exports = router;