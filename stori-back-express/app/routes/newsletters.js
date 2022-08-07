const express = require("express");
const router = express.Router();
const newsletters = require("../controllers/newsletter.js");

/* GET newsletters listing. */
router.get("/", newsletters.findAll);

/* GET newsletters listing by topic. */
router.get("/topic/:id", newsletters.findAllByTopic);

/* GET newsletters listing published. */
router.get("/published", newsletters.findAllPublished);

/* GET newsletter by id. */
router.get("/:id", newsletters.findOne);

/* POST newsletter. */
router.post("/", newsletters.create);

/* DELETE newsletter. */
router.delete("/:id", newsletters.delete);

module.exports = router;
