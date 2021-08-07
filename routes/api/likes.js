const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')

router.post('/posts/:id/likes', likesCtrl.create)
router.delete('/likes/:id', likesCtrl.deleteLike)
router.get('/match', likesCtrl.match)

module.exports = router;