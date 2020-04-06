const Member = require("../models/member");

module.exports = {
  index: (req, res) => {
    Member.find({})
      .then(members => {
        res.render("member/index", {
          members: menbers
        })
      })
      .catch(error => {
        console.log(`Error fetching members: ${ error.message }`);
        res.redirect("/");
      });
  }
};
