const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');
const actorsValidator = require('../validations/actor_validator');

router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);
router.get('/actors/add', actorsController.add);
router.post('/actors/create',actorsValidator, actorsController.store);
router.get('/actors/edit/:id', actorsController.edit);
router.put('/actors/update/:id',actorsValidator, actorsController.update);
router.get('/actors/delete/:id', actorsController.delete);
router.delete('/actors/delete/:id', actorsController.destroy);

module.exports = router;
