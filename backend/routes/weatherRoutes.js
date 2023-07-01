const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/current/:location', weatherController.getCurrentWeather);
router.get('/hourly/:location', weatherController.getHourlyWeather);
router.get('/weekly/:location', weatherController.getWeeklyWeather);
router.get('/airquality/:location', weatherController.getAirQuality);
router.get('/uv/:location', weatherController.getUV);
router.get('/weathercard/:location', weatherController.getWeatherCard);

module.exports = router;
