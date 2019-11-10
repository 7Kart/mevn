const express = require('express');

const router = express.Router();
const devCtr = require('../controllers/developers')

router.get('/GetAllDevelopers', devCtr.GetAllDevelopers);


module.exports = router;