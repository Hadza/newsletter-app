var express = require("express");
var router = express.Router();
const topics = require("../controllers/topics.js");

/* GET topics listing. */
router.get("/", topics.findAll);

/* GET topic by id. */
router.get("/:id", topics.findOne);

/* POST topic. */
router.post("/", topics.create);

/* PUT topic. */
router.put("/:id", topics.update);

/* DELETE topic. */
router.delete("/:id", topics.delete);

module.exports = router;
