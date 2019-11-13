module.exports = function(roles) {
  return function(req, res, next) {
    if(roles.includes(req.decodedJwt.role)) {
      next();
    } else {
      res.status(403).json({ message: `You do not have the credentials to access this directory.` });
    };
  };
};