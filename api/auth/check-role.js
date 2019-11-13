module.exports = function(role) {
  return function(req, res, next) {
    if(req.user) {
      if(req.user.roles && Array.isArray(req.user.roles) && req.user.roles.include(role)) {
        next();
      } else {
        res.status(400).json({ message: `You do not have the credentials to manipulate this directory.` });
      };
    } else {
      res.status(400).json({ message: `You do not have the credentials to access this directory.` });
    };
  };
};