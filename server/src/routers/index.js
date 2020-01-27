const express = require('express'),
    router = express.Router(),
    a101Ctr = require('../controllers/A101ctr'),
    pickCtr = require('../controllers/pickCtr')

//A101
router.get('/GetA101Flats', a101Ctr.GetA101Flats);
router.get('/ParceAllA101Flats', a101Ctr.ParceAllA101Flats);
router.get('/ParceAllA101FlatsAsync', a101Ctr.ParceAllA101FlatsAsync);
router.get('/getNewDevelopersProjects', a101Ctr.getNewDevelopersProjects);
router.get('/GetFlats', a101Ctr.GetFlats);

// Pick developer
router.get('/GetPickLocation', pickCtr.GetPickLocation);
router.get('/GetPickShowRoom', pickCtr.GetPickShowRoom);
router.get('/GetPickFlats', pickCtr.GetPickFlats);
router.get('/GetPickBlocks', pickCtr.GetPickBlocks);
router.get('/GetPickBulks', pickCtr.GetPickBulks);
router.get('/GetPickChanges', pickCtr.GetPickChanges);
router.get('/GetNewPickProjects', pickCtr.GetNewPickProjects);
router.get('/GetNewPickFlats', pickCtr.GetNewPickFlats)
module.exports = router;