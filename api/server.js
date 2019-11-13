const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const Auth = require();
// const Users = require();

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`You have reached the root directory.`);
});

module.exports = server;