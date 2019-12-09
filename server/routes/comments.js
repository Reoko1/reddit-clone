const { Router } = require("express");
const { comments } = require("../controllers");

const router = Router();

router.route("/").post(comments.create);

module.exports = router;
