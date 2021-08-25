const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token from the header
  const token = req.header('x-auth-token');

  //Check if there's no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: `There's no token, Authorization Failed` });
  }

  //Verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
