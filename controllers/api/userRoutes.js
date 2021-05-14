const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



//get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    })

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
      include: [
        {
          model: Post,
          attributes: ["id", "post_title", "post_content", "date_created"],
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
      return;
    }


    const user = userData.get({ plain: true });

    res.status(200).json(user);


  } catch (err) {
    res.status(500).json(err)
  }
});

//create user
//signup
router.post('/', async (req, res) => {
  try {

    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.logged_in = true;
    });
    res.status(200).json(userData);


  } catch (err) {
    res.status(500).json(err)
  }
});

//post a login request
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!userData) {
      res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if(!validPassword) {
        res
        .status(400)
        .json({ message: 'Incorrect Email or Password, please try again' });
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.email = userData.email;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in' });
    });
  
    console.log(userData);

  } catch (err) {
    res.status(500).json(err)
  }
});

//post logout request
router.post('/logout', (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//update user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update({
      where: {
        id: req.params.id,
      },
    });

    if(!userData[0]) {
      res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
      return;
    }
    res.status(200).json(userData);


  } catch (err) {
    res.status(500).json(err)
  }
});

//delete request user
router.delete('/:id', async (req,res) => {
  try {

    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!userData) {
      res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
      return;
    }
    res.status(200).json(userData)


  } catch (err) {
    res.status(500).json(err)
  }
})







module.exports = router;