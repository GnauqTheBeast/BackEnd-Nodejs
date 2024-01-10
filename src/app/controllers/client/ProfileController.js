const User = require('../../model/users.model');

const ProductController = {
  me: (req, res, next) => {
    User.find({})
      .then(data => {
        res.json(data)
      })
      .catch(next)
  },
  you: (req, res, next) => {
    res.json({ message: "Thu Ha" });
  },
};

module.exports = ProductController;
