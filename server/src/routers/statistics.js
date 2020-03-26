const express = require('express');

const router = express.Router();
const statisticCtr = require('../controllers/statistics')

router.get('/GetStatistics', statisticCtr.GetStatisctics);


module.exports = router;