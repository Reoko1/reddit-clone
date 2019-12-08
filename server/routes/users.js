const { Router } = require("express");
const { users } = require("../controllers");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router.post("/register", check(schemas.register, "body"), users.register);
router.post("/login", check(schemas.login, "body"), users.login);

module.exports = router;
