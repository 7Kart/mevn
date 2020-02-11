const express = require('express');

const router = express.Router();
const devCtr = require('../controllers/developers')

router.get('/GetAllDevelopers', devCtr.getAllDevelopers);
router.get('/GetDevelopersProjects', devCtr.getDevelopersProjects);

module.exports = router;