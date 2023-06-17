require('dotenv').config({ path: '../.env' });
const moment = require('moment');
const fetchWeatherData = require('../api.js');

exports.getCurrentWeatherData = async (location, aqi) => {
    try {
       
        const data = await fetchWeatherData(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=${aqi ? 'yes' : 'no'}`);       
        return data;

    }catch (error){
        console.error(error);
    }
}
// get next 24 hours
exports.getHourlyWeatherData = async (location) => {
    try {
        const data = await fetchWeatherData(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=2&aqi=no&alerts=no`);
        
        const hours = data['forecast']['forecastday'][0]['hour'];
        hours.push(...data['forecast']['forecastday'][1]['hour']);
        
        const current = {
            time : 'Now',
            temp_f : Math.round(data['current']['temp_f']) + '°',
            icon : data['current']['condition']['icon']
        };
        const currentTime = data['current']['last_updated'];
        const hourly = [];
        hourly.push(current);
        let count = 1;

        hours.map(item => {
            
            if (item.time > currentTime && count < 24){
                let h = item.time.split(" ")[1];
                if (h <= '11:00'){
                    h = h[0] === '0' ? h[1] === '0' ? '12AM' : h[1] + 'AM'  : h[0] + h[1] + 'AM';
                }else{
                    let n = parseInt(h[0] + h[1]);
                    h = n === 12 ? 12 + 'PM' : (parseInt(h[0] + h[1]) - 12) + 'PM';
                }
                
                const hour = {
                    time : h,
                    temp_f : Math.round(item.temp_f) + '°',
                    icon : item.condition.icon
                };
                hourly.push(hour);
                count++;
            };
        });
        
        return hourly;
    } catch (error){
        console.error(error);
    }
}

exports.getWeeklyWeatherData = async (location) => {
    
    try {
        const data = await fetchWeatherData(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
        let week = [];
        let weekly = [];

        
        for (let day = 0; day < 3; day++){ // 3 days for now
            week.push(data['forecast']['forecastday'][day]['hour']);
        }

        
        week.map(item => {

            let low = Number.MAX_VALUE;
            let high = Number.MIN_VALUE;

            for (let time = 0; time < 24; time++){
                low = Math.min(item[time].temp_f, low);
                high = Math.max(item[time].temp_f, high);
            }

            let today = moment().startOf('day');
            let date = moment(item[0].time.split(' ')[0]);

            const dayOfWeek = {
                day : date.isSame(today, 'day') ? 'Today' : date.format('dddd'),
                icon : '',
                low : low,
                high : high
            };

            weekly.push(dayOfWeek);

        });

        return weekly;
    } catch (error){
        console.error(error);
    }
}