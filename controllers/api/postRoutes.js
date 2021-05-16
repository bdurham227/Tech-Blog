const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const router = require('express').Router();
const withAuth = require('../../utils/auth');


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
          include: {
            model: User,
            attributes: ["username"],
          },
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
          include: {
            model: User,
            attributes: ["username"],
          }
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
});


//create post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    console.log(postData);
    res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err)
  }
 });

 //update post
 router.put('/:id', async (req, res) => {
   try {
    const postData = await Post.update({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if(!postData) {
      res.status(404).json({ message: `No Post with the ID ${req.params.id} found!` });
      return;
    }

    res.status(200).json(postData)

   } catch (err) {
     res.status(500).json(err)
   }
 });

 //delete post
 router.delete('/:id', async (req, res) => {
   try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!postData) {
        res.status(404).json({ message: `No Post with the ID ${req.params.id} found!` });
        return;
      }

      res.status(204).json(postData);

   } catch (err) {
     res.status(500).json(err)
   }
 })










module.exports = router;