const { Router } = require("express");
const users = require("./users");
const posts = require("./posts");

const router = Router();

router.use("/api/users", users);
router.use("/api/posts", posts);

module.exports = router;
