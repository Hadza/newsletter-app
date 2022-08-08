var express = require("express");
var router = express.Router();
const users = require("../controllers/user.js");

router.get("/", users.findAll);

/* GET users listing by topic */
router.get("/:topic_id", users.findAllByTopic);

/* GET user by email */
router.get("/email/:email", users.findByEmail);

/* GET users count. */
router.get("/count", users.count);

/* POST subscription. */
router.post("/:id/subscriptions", users.createSubscription);

/* DELETE subscription. */
router.delete("/:id/subscriptions", users.deleteSubscription);

/* POST user. */
router.post("/", users.create);

/* POST users. */
router.post("/bulk", users.createUsers);

/* GET users count. */

module.exports = router;
