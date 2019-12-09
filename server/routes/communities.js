const { Router } = require("express");
const { communities } = require("../controllers");
const { protect } = require("../middlewares/authentications");
const { schemas, check } = require("../middlewares/validations");

const router = Router();

router
  .route("/")
  .get(communities.getAll)
  .post(protect, check(schemas.createCommunity, "body"), communities.create);
router.get("/:name", communities.getByName);

module.exports = router;
