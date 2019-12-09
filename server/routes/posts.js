const { Router } = require("express");
const { posts } = require("../controllers");
const { protect } = require("../middlewares/authentications");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router.route("/").post(protect, posts.create);
router.post("/upvote/:post_id", protect, posts.upvote);
router.post("/downvote/:post_id", protect, posts.downvote);
router.patch(
  "/update/:post_id",
  protect,
  check(schemas.updatePost, "body"),
  posts.update
);
router.get("/community/:community_id", posts.getByCommunity);
router.get("/user/:user_id", posts.getByUser);

module.exports = router;
