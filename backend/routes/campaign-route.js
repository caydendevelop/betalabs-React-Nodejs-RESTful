const express = require('express');
const { check } = require('express-validator');
const campaignController = require('../controllers/campaign-controller');


const router = express.Router();

router.get('/getPackage', campaignController.getPackage); //localhost:5000/getPackage

router.post('/getHistory', campaignController.getHistory); //localhost:5000/getHistory

router.post('/purchasePackage', campaignController.purchasePackage); //localhost:5000/purchasePackage

module.exports = router;