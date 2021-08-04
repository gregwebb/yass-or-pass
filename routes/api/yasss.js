const express = require('express');
const router = express.Router();
const yassCtrl = require('../../controllers/yasss')

router.post('/posts/:id/yasss', yasssCtrl.create)
router.delete('/yasss/:id', yasssCtrl.deleteYass)

module.exports = router;