const express = require('express');

const router = express.Router();
const flatsCtr = require('../controllers/flat')

router.get('/GetFlats', flatsCtr.GetFlats);
router.get('/FindDeletedFlats', flatsCtr.FindDeletedFlats)

module.exports = router;