const homeCtr = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/getA101Flats', homeCtr.GetA101Flats);
router.get('/getA101FilterParams', homeCtr.getA101FilterParams);
router.get('/getA101FlatsHistory', homeCtr.GetA101FlatsHistory);
router.get('/test', homeCtr.test)

module.exports = router;