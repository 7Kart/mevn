const express = require('express');

const router = express.Router();
const flatsCtr = require('../controllers/flat')

router.get('/GetFlats', flatsCtr.GetFlats);

module.exports = router;