require('dotenv').config({ path: '../.env' });
const moment = require('moment');

exports.getCurrentWeatherData = async (location, aqi) => {
    try {
       
        const response = await axios(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=${aqi ? 'yes' : 'no'}`);       
        return response.data;

    }catch (error){
        console.error(error);
    }
}
// get next 24 hours
exports.getHourlyWeatherData = async (location) => {
    try {
        const response = await axios(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=2&aqi=no&alerts=no`);
        
        const hours = response.data['forecast']['forecastday'][0]['hour'];
        hours.push(...response.data['forecast']['forecastday'][1]['hour']);
        
        const current = {
            time : 'Now',
            temp_f : Math.round(response.data['current']['temp_f']) + '°',
            icon : response.data['current']['condition']['icon']
        };
        const currentTime = response.data['current']['last_updated'];
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
        const response = await axios(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
        let week = [];
        let weekly = [];

        
        for (let day = 0; day < 3; day++){ // 3 days for now
            week.push(response.data['forecast']['forecastday'][day]['hour']);
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
};

exports.getAirQualityData = async(location) => {
    try {
        const response = await axios(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=yes`);
        const index = response.data['current']['air_quality']['us-epa-index'];
        
        const table = {
            1 : 'Good',
            2 : 'Moderate',
            3 : 'Unhealthy for Sensitive Group',
            4 : 'Unhealthy',
            5 : 'Very Unhealthy',
            6 : 'Hazardous'
        };
        
        return table[index];
    }catch (error){
        console.error(error);
    }
};

exports.getUVData = async(location) => {
    try {
        const response = await axios(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`);
        return response.data['current']['uv'];
    }catch(error){
        console.error(error);
    }
};