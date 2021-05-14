const { User } = require('../models');


const dbUserData = [

  {
      username: "Brie",
      email: "bbradford@gmail.com",
      password: "password12345"
  },
  {
      username: "Vito",
      email: "vito@gmail.com",
      password: "password12345"
  },
  {
      username: "Patrick",
      email: "patrick@gmail.com",
      password: "password12345"
  },
  {
      username: "Ben",
      email: "ben@gmail.com",
      password: "password12345"
  }

];

const seedUsers = () => User.bulkCreate(dbUserData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
  