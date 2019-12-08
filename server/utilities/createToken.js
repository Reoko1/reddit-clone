const jwt = require("jsonwebtoken");

const createToken = (payload, secret, duration) => {
  const token = jwt.sign(payload, secret, { expiresIn: duration });
  return token;
};

module.exports = createToken;
