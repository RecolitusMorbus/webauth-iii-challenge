const router = require('express').Router();

const Users = require('../models/user-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: `An error prevented your request from completion.` });
    });
});

module.exports = router;