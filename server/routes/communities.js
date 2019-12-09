const { Router } = require("express");
const { communities } = require("../controllers");
const { protect } = require("../middlewares/authentications");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router
  .route("/")
  .post(protect, check(schemas.createCommunity, "body"), communities.create);

module.exports = router;
