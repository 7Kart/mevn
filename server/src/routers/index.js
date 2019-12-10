const homeCtr = require('../controllers');
const express = require('express');
const router = express.Router();


router.get('/ParceAllA101Flats', homeCtr.ParceAllA101Flats);
router.get('/ParceAllA101FlatsAsync', homeCtr.ParceAllA101FlatsAsync);
router.get('/getNewDevelopersProjects', homeCtr.getNewDevelopersProjects);
router.get('/GetA101Flats', homeCtr.GetA101Flats);
router.get('/GetFlats', homeCtr.GetFlats);

// Pick developer
router.get('/GetPickLocation', homeCtr.GetPickLocation);
router.get('/GetPickShowRoom', homeCtr.GetPickShowRoom);


module.exports = router;