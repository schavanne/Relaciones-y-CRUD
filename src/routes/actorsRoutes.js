const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/actors/detail/:id', actorsController.detail);
router.get('/actors', actorsController.list);

module.exports = router;
