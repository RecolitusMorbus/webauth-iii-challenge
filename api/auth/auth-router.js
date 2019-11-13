const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/user-models.js');
const secrets = require('../../data/config/secrets.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ err: "An error prevented the user's profile from creation." });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users
    .findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome, ${username}. You have been issued a token.`,
          token
        });
      } else {
        res.status(400).json({ message: `Invalid credentials.` });
      };
    })
    .catch(err => {
      res.status(500).json({ err: "An error prevented you from logging into the network." });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student']
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;