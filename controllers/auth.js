const User = require("../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const fs = require("fs");

const payload = {};

const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).exec((err, user) => {
    if (err) return res.status(400).json({ message: err });

    if (user == null) {
      return res.status(403).json({ message: "Account not found" });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return res.status(403).json({ message: "Password False" });
      }

      const token = jwt.sign(payload, process.env.SECRET);

      return res.json({ user, token });
    });
  });
};

exports.signup = (req, res) => {
  const { username, password, name } = req.body;

  User.findOne({ username }).exec((err, user) => {
    if (err) return res.status(400).json({ message: err });

    if (user !== null) {
      return res.status(403).json({ message: "Username already used" });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      const token = jwt.sign(payload, process.env.secret);

      const newUser = new User({
        username,
        password: hash,
        name,
        verified: {
          token,
        },
      });

      newUser.save((err, user) => {
        if (err) return res.status(400).json({ message: err });

        return res.json({ user, token });
      });
    });
  });
};
