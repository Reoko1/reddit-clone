const { Router } = require("express");
const { posts } = require("../controllers");
const { protect } = require("../middlewares/authentications");

const router = Router();

router.route("/").post(protect, posts.create);
router.post("/upvote/:post_id", protect, posts.upvote);
router.post("/downvote/:post_id", protect, posts.downvote);

module.exports = router;
