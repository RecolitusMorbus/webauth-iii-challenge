const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../../data/config/secrets.js');
const Users = require('../models/user-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ err: "An error prevented your registration." });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users
    .findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.name);

        Users
          .findById(user.id)
          .then(user => {
            res.status(200).json({ message: `Welcome, ${user.username}`, token })
          });
      } else  {
        res.status(401).json({ message: `Denied. You have invalid credentials.` })
      };
    })
    .catch(err => {
      res.status(500).json({ err: `An error that prevented a successful login.` });
    });
});

function getJwtToken(username) {
  const payload = { username };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecrets, options);
};

module.exports = router;