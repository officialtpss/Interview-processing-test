const errorHandler = require('./../handler/error.handler');
const jwt = require('jsonwebtoken');
const message = require('../constant/index');

//  JWT Token encode
module.exports.encode = (req, res) => {
  jwt.sign(
    {
      userId: res.user._id,
      email: res.user.email,
    },
    message.JWT_SECRET,
    (err, token) => {
      if (err) {
        res.status(400).send(
          {
            message: errorHandler.getErrorMessage(err),
          });
      } else {
        res.status(200).send({
          success: 'OK',
          token,
          profile: res.profile,
        });
      }
    }
  );
};


//  JWT Token Decode
module.exports.decode = (req, res, next) => {
  if (req.headers['authorization'] === void 0) {
    res.sendStatus(401);
    return false;
  }
  const accessToken = req.headers['authorization'].split(' ');
  if (accessToken[0] !== 'Bearer') {
    res.sendStatus(401);
    return false;
  }
  jwt.verify(accessToken[1], message.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.userId = decoded.userId;
      res.email = decoded.email,
        next();
    }
  });
};