const sequelize = require('../config/connection');
const { User, Post } = require('../models');


const userData = require('./userData.json');
const postData = require('./postsData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const posts of postData) {
      await Post.create({
        ...posts,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();