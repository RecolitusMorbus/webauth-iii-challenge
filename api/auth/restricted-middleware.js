const jwt = require('jsonwebtoken');
const secret = require('../../data/config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secret.jwtSecrets, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: `Invalid credentials.` });
      } else {
        req.decodedJwt = decodedToken;
        next();
      };
    });
  } else {
    res.status(400).json({ message: `No credentials provided.` });
  };
};