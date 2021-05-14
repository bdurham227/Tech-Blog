const { Comment } = require('../models');

const dbCommentData = [
  {
    post_id: 2,
    user_id: 1,
    comment_body: "Great Work!"
  },
  {
    post_id: 3,
    user_id: 2,
    comment_body: "I love pig latin too!"
  },
  {
    post_id: 1,
    user_id: 3,
    comment_body: "Hey what is 2 + 2?"
  },
  {
    post_id: 4,
    user_id: 4,
    comment_body: "Do you know how to tango too?"
  },
];

const seedComments = () => Comment.bulkCreate(dbCommentData);

module.exports = seedComments;