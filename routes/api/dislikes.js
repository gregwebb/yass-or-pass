const express = require("express");
const router = express.Router();
const dislikesCtrl = require("../../controllers/dislikes");

router.post("/posts/:id/dislikes", dislikesCtrl.create);
router.delete("/dislikes/:id", dislikesCtrl.deleteDislike);

module.exports = router;
