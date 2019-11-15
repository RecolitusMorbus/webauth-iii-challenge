const express = require('express');
const Users = require('./routes/user-router.js');
const Auth = require('./auth/auth-router.js');

const server =  express();

server.use(express.json());
server.use('/restricted/users', Users);
server.use('/auth', Auth);

server.get('/', (req, res) => {
  res.send(`You have reached the root directory.`);
});

module.exports = server;