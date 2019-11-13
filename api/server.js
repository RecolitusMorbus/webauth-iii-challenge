const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Auth = require('./auth/auth-router.js');
const Users = require('./routes/user-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/restricted/auth', Auth);
server.use('/restricted/users', Users);

server.get('/', (req, res) => {
  res.send(`You have reached the root directory.`);
});

module.exports = server;