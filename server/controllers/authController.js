const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res) => {
    if (req.body.username && req.body.password) {
      let flag = true;
      users.forEach(user => {
        if (
          req.body.username === user.username &&
          req.body.password === user.password
        ) {
          flag = false;
          req.session.user.username = req.body.username;
          res.status(200).send(req.session.user);
          return;
        }
      });
      if (flag) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(400);
    }
  },

  register: (req, res) => {
    let newUser = {
      id: id,
      username: req.body.username,
      password: req.body.password
    };
    users.push(newUser);
    console.log(users);
    req.session.user.username = req.body.username;
    id++;
    res.status(200).send(newUser);
  },
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser: (req, res) => {
    res.status(200).send(req.session.user);
  }
};
