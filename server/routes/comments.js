const { Router } = require("express");
const { comments } = require("../controllers");
const { protect } = require("../middlewares/authentications");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router
  .route("/")
  .post(protect, check(schemas.createComment, "body"), comments.create);
router.post("/upvote/:comment_id", protect, comments.upvote);
router.post("/downvote/:comment_id", protect, comments.downvote);
router.patch(
  "/update/:comment_id",
  protect,
  check(schemas.updateComment, "body"),
  comments.update
);
router.get("/post/:post_id", comments.getByPost);

module.exports = router;
