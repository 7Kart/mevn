const homeCtr = require('../controllers');
const express = require('express');
const router = express.Router();


router.get('/ParceAllA101Flats', homeCtr.ParceAllA101Flats);
router.get('/ParceAllA101FlatsAsync', homeCtr.ParceAllA101FlatsAsync);
router.get('/getA101FilterParams', homeCtr.getA101FilterParams);
router.get('/getNewDevelopersProjects', homeCtr.getNewDevelopersProjects);
router.get('/GetA101Flats', homeCtr.GetA101Flats);
router.get('/test', homeCtr.test);

module.exports = router;