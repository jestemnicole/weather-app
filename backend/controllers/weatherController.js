const weatherService = require('../services/weatherService');

exports.getCurrentWeather = async (req, res) => {

    try {
    const weatherData = await weatherService.getCurrentWeatherData(req.params.location, false);
    res.json(weatherData);

    }catch (error){
        res.status(500).json({message: 'Error'});
    }
};
// get the next 24 hours 
exports.getHourlyWeather = async (req, res) => {

    try {
        const hourlyWeatherData = await weatherService.getHourlyWeatherData(req.params.location);
        res.json(hourlyWeatherData);
    } catch (error){
        res.status(500).json({message: 'Error'});
    }
};

exports.getWeeklyWeather = async (req, res) => {
    try {
        const weeklyWeatherData = await weatherService.getWeeklyWeatherData(req.params.location);
        res.json(weeklyWeatherData);
    } catch (error){
        res.status(500).json({message: 'Error'});
    }
};
exports.getAirQuality = async (req, res) => {

    try { 
        const airQualityData = await weatherService.getAirQualityData(req.params.location);
        
        res.json(airQualityData);
    } catch (error){
        res.status(500).json({message : 'Error'})
    }

};

exports.getUV = async (req, res) => {
    try { 
        const UVData = await weatherService.getUVData(req.params.location);
        
        res.json(UVData);
    } catch (error){
        res.status(500).json({message : 'Error'})
    }
};

