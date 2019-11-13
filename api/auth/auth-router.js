const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/user-models.js');
const secrets = require('../../data/config/secrets.js');
const { validateUser } = require('../models/user-helper.js');

router.post('/register', (req, res) => {
  const user = req.body;
  const validateResults = validateUser(user);

  if(validateUser.isSuccessful === true) {
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
  } else {
    res.status(400).json({
      message: "Invalid information about the user. See errors for details.",
      errors: validateResults.errors
    });
  };
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users
    .findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);

        res.status(200).json({
          message: `Welcome, ${user.username}. You have been issued a token.`,
          token
        });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      };
    })
    .catch(err => {
      res.status(500).json({ err: "An error prevented you from logging into the network." });
    });
});

function getJwtToken(username) {
  const payload = {
    username,
    role: 'student'
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;