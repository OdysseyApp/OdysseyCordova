const jwt = require("jsonwebtoken");

exports.JWT_SECRET = "hello";

exports.generateToken = (user, secret) => {
  const { user_id, email } = user;
  return jwt.sign({ user_id, email }, secret, {
    expiresIn: "12h"
  });
};

exports.verifyToken = token => {
  try {
    var valid = jwt.verify(token, this.JWT_SECRET);

    return valid ? valid : undefined;
  } catch (err) {
    return undefined;
  }
};
