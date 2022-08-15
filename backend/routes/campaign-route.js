const express = require('express');
const { check } = require('express-validator');
const campaignController = require('../controllers/campaign-controller');


const router = express.Router();

router.get('/getPackage', campaignController.getPackage); 
router.get('/getFlight', campaignController.getFlight); 
router.get('/getHotelroom', campaignController.getHotelroom); 
router.get('/getHistory', campaignController.getHistory); 

router.post('/postReserveFlight/', campaignController.postReserveFlight); 
router.post('/postReserveHotelroom/', campaignController.postReserveHotelroom); 
router.post('/postGetHistory', campaignController.postGetHistory); 
router.post('/postPurchasePackage', campaignController.postPurchasePackage); 

module.exports = router;