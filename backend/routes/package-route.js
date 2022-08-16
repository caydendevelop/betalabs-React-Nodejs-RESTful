const express = require('express');
const packageController = require('../controllers/package-controller');



const router = express.Router();

router.get('/getPackage', packageController.getPackage); 
router.post('/postPurchasePackage', packageController.postPurchasePackage); 

module.exports = router;