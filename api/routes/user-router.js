const router = require('express').Router();

const Users = require('../models/user-models.js');
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role.js');

router.get('/', restricted, checkRole('student'), (req, res) => {
  Users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: "An error prevented your access to this directory." });
    });
});

module.exports = router;