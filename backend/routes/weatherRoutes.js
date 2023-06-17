const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/current/:location', weatherController.getCurrentWeather);
router.get('/hourly/:location', weatherController.getHourlyWeather);
router.get('/weekly/:location', weatherController.getWeeklyWeather);

module.exports = router;
