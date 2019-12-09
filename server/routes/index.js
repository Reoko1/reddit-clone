const { Router } = require("express");
const users = require("./users");
const communities = require("./communities");
const posts = require("./posts");
const comments = require("./comments");

const router = Router();

router.use("/api/users", users);
router.use("/api/communities", communities);
router.use("/api/posts", posts);
router.use("/api/comments", comments);

module.exports = router;
