const express = require('express');
const flightController = require('../controllers/flight-controller');



const router = express.Router();

router.get('/getFlight', flightController.getFlight); 
router.post('/postReserveFlight/', flightController.postReserveFlight); 

module.exports = router;