// const router = require('express').Router();
// const { User } = require('../../models');
// // const session = require('express-session');
// // const withAuth = require('../../utils/auth');
const router = require('express').Router();
const { User } = require('../../models');


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
        {
          model: Comment,
          attributes: ["id", "user_id", "post_id", "comment_body"],
          include: {
            model: Post,
            attributes: ["post_title"],
          }
        }
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

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
   
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.email = user.email;
      req.session.logged_in = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});









// //update user
// router.put('/:id', async (req, res) => {
//   try {
//     const userData = await User.update({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if(!userData[0]) {
//       res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
//       return;
//     }
//     res.status(200).json(userData);


//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

// //delete request user
// router.delete('/:id', async (req,res) => {
//   try {

//     const userData = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if(!userData) {
//       res.status(404).json({ message: `No User with ID of ${req.params.id} found!` });
//       return;
//     }
//     res.status(200).json(userData)


//   } catch (err) {
//     res.status(500).json(err)
//   }
// })









module.exports = router;