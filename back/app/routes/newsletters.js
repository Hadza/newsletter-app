const express = require("express");
const router = express.Router();
const newsletters = require("../controllers/newsletter.js");
const multer = require("multer");
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage : storage}).single('file');

/* GET newsletters listing. */
router.get("/", newsletters.findAll);

/* GET newsletters listing by topic. */
router.get("/topic/:id", newsletters.findAllByTopic);

/* GET newsletters listing published. */
router.get("/published", newsletters.findAllPublished);

/* GET newsletter by id. */
router.get("/:id",newsletters.findOne);

/* POST newsletter. */
router.post("/", upload, newsletters.create);

/* POST send newsletter. */
router.post("/send/:id", newsletters.sendNewsletter);

/* DELETE newsletter. */
router.delete("/:id", newsletters.delete);

module.exports = router;
