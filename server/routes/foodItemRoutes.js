const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');

router.post('/addFoodItem', foodItemController.addFoodItem);
router.get('/foodItems', foodItemController.getFoodItems);

module.exports = router;