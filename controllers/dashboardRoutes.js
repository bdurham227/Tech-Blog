const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//get all
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        id: user_id
      }
    })


  } catch (err) {
    res.status(500).json(err)
  }
})








module.exports = router;