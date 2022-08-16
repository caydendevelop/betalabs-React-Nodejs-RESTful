const express = require('express');
const hotelroomController = require('../controllers/hotelroom-controller');



const router = express.Router();

router.get('/getHotelroom', hotelroomController.getHotelroom); 
router.post('/postReserveHotelroom/', hotelroomController.postReserveHotelroom); 

module.exports = router;