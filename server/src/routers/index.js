const homeCtr = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', homeCtr.homePage)

module.exports = router;