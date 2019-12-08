const bcrypt = require("bcrypt");
const database = require("../database");
const createToken = require("../utilities/createToken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = {};
  try {
    // Check whether name is already taken
    const userName = await database("users")
      .select()
      .where({ name });
    // Check whether email address is already taken
    const userEmail = await database("users")
      .select()
      .where({ email });
    if (userName.length > 0) {
      errors.name = "Name is already taken";
    }
    if (userEmail.length > 0) {
      errors.email = "Email address is already taken";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(409).send(errors);
    }
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create new user
    const newUser = await database("users").insert(
      { name, email, password: hashedPassword },
      "*"
    );
    res.status(201).send(newUser);
  } catch (e) {
    console.error(e);
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check whether user with name exists
    const userName = await database("users")
      .select()
      .where({ name });
    if (!userName.length) {
      return res.status(404).send({ name: "Invalid Name" });
    }
    const user = userName[0];
    // Check whether the passwords match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ password: "Invalid Password" });
    }
    // Create refresh token
    const refreshToken = createToken(
      { user_id: user.id, version: user.token_version },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_DURATION
    );
    // Stick refresh token in a cookie
    res.cookie("jwt", refreshToken, {
      maxAge: parseInt(process.env.REFRESH_DURATION),
      httpOnly: true,
      sameSite: true
    });
    // Create access token
    const accessToken = createToken(
      { user_id: user.id, version: user.token_version },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_DURATION
    );
    res.send({ token: accessToken, user: { id: user.id, name: user.name } });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  register,
  login
};
