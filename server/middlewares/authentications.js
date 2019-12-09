const jwt = require("jsonwebtoken");
const database = require("../database");

const protect = async (req, res, next) => {
  // Extract the access token from the request header
  const { authorization } = req.headers;
  // No access token was found
  if (!authorization) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  try {
    // Check whether the token was signed with the secret
    const decoded = await jwt.verify(authorization, process.env.ACCESS_SECRET);
    console.log("Decoded", decoded);
    // Invalid secret
    if (!decoded) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
    const { user_id, version } = decoded;
    // Check whether the token version is the latest
    const users = await database("users")
      .select()
      .where({ id: user_id, token_version: version });
    // No user was found
    if (!users[0]) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
    // Make user data accessible as property of the request
    req.user = users[0];
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = {
  protect
};
