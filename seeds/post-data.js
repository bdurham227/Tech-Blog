const { Post } = require('..//models');

 const dbPostData = [
  {
      post_title: "First Day",
      post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua ",
      date_created: "March 30, 2018",
      user_id: 1
  },
  {
      post_title: "Second Day",
      post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua ",
      date_created: "April 12, 2019",
      user_id: 2
  },
  {
      post_title: "Third Day",
      post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua ",
      date_created: "August 5, 2020",
      user_id: 3
  },
  {
    post_title: "Fourth Day",
    post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua ",
    date_created: "May 25, 2011",
    user_id: 4
  }
];

const seedPosts = () => Post.bulkCreate(dbPostData);

module.exports = seedPosts;

