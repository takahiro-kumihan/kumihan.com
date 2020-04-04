// require Model
const User = require("../models/user");
// POST
exports.postUser = (req, res) => {
  res.render("user_post");
};
// SAVE
exports.saveUser = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    c_code: req.body.c_code
  });
  newUser.save()
    .then(u => {
      res.render("user_save", {
        User: u
      });
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
// GETS
exports.getsUser = (req, res) => {
  User.find({})
    .exec()
    .then(us => {
      res.render("user_gets", {
        Users: us
      });
    })
    .catch(error => {
      console.log(error.message);
      return[];
    })
    .then(() => {
      console.log("complete userGets promise...");
    });
};
