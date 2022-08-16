const express = require('express');
const historyController = require('../controllers/history-controller');



const router = express.Router();

router.get('/getHistory', historyController.getHistory); 
router.post('/postGetHistory', historyController.postGetHistory); 

module.exports = router;