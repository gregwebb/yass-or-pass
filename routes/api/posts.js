const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/posts");

router.post("/", postsCtrl.create);
router.get("/", postsCtrl.index);

module.exports = router;
