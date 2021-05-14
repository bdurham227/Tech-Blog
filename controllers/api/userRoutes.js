const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



//get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    //serialize data
    const users = userData.map((user) => user.get({ plain: true }));

    res.status(200).json(users);

  } catch (err) {
    res.status(500).json(err)
  }
});

//get one
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    const user = userData.get({ plain: true });

    res.status(200).json(user);


  } catch (err) {
    res.status(500).json(err)
  }
})







module.exports = router;