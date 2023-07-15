import React from 'react';
import {useState, useEffect} from 'react';
import FRONTEND_URL from '../config/config.js';
import axios from 'axios';
import { WeeklyWeatherInterface } from '../types/index.js';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { PropsWithChildren } from 'react';

  type WeatherPageProps = {
    location : string
  }


function WeatherPage(props : PropsWithChildren<WeatherPageProps>): JSX.Element {
 
    const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
    const [hourlyWeatherData, setHourlyWeatherData] = useState<any>(null);
    const [weeklyWeatherData, setWeeklyWeatherData] = useState<any>(null);
    const [airQualityData, setAirQualityData] = useState('');
    const [uvIndexData, setUvIndexData] = useState('');
    
      async function fetchWeatherData(url : string, setWeatherData : React.Dispatch<any>) {
          try {
           
            const response = await axios(url);
            setWeatherData(response.data);
            
          } catch (e){
            console.error(e);
          }
      }
      
  
  
      useEffect(() => {
     
          const currentWeatherURL = `${FRONTEND_URL}/current/${props.location}`;
          const hourlyWeatherURL = `${FRONTEND_URL}/hourly/${props.location}`;
          const weeklyWeatherURL = `${FRONTEND_URL}/weekly/${props.location}`;
          const airQualityURL = `${FRONTEND_URL}/airquality/${props.location}`;
          const uvURL = `${FRONTEND_URL}/uv/${props.location}`;
          
          fetchWeatherData(currentWeatherURL, setCurrentWeatherData);
          fetchWeatherData(hourlyWeatherURL, setHourlyWeatherData);
          fetchWeatherData(weeklyWeatherURL, setWeeklyWeatherData);
          fetchWeatherData(airQualityURL, setAirQualityData);
          fetchWeatherData(uvURL, setUvIndexData);
        
          
        }, []);
  

        const image = (currentWeatherData && currentWeatherData.current.condition.text === "Sunny") ? require("../assets/blue_sky.jpg") : (currentWeatherData && currentWeatherData.current.condition.text === "Clear") ? require("../assets/night_sky.jpg") : require("../assets/blue_sky.jpg");

      return (

       <ImageBackground style={{flex : 1}} source={image}>
      
      <ScrollView>
        {props.children}
      {currentWeatherData && <View style={styles.currentWeatherDisplay}>
        <Text style={{fontSize: 40,
                      marginTop: 30,
                      color : 'white', 
                      fontFamily : 'Roboto', 
                      marginBottom : -20
                      }}>
                    {currentWeatherData.location.name}
        </Text>
          
        <Text style={{fontSize: 100, 
                      color : 'white', 
                      marginBottom : -10,
                      fontFamily : 'Roboto'
                      }}>
                    {Math.round(currentWeatherData.current.temp_f)}
        </Text>
        
        

        <Text style={{fontSize: 20, 
                      color : 'white', 
                      marginBottom: 10}}>
                    {currentWeatherData.current.condition.text}
        </Text>

      </View>}

    {hourlyWeatherData && <FlatList style={styles.hourlyWeatherList} data={hourlyWeatherData}
              renderItem={({item}) => 
                <View style={styles.hourlyWeatherDisplay}>
                  <Text style={{color : 'white', fontFamily: 'Roboto', fontSize : 15}}>{item.time}</Text>
                  <Image source={{uri : 'https:' + item.icon}}
                          style={{width: 40, height: 40}}></Image>
                  <Text style={{color : 'white', fontFamily: 'Roboto', fontSize : 20}}>{item.temp_f}</Text>
                </View>}
               horizontal={true}>
      </FlatList>}

      
      {weeklyWeatherData &&
      <View style={styles.weeklyWeatherList}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 13}}>3-DAY FORECAST</Text>
      {weeklyWeatherData && weeklyWeatherData.map((item : WeeklyWeatherInterface) => {
              return (
              <View key={item.day} style={styles.weeklyWeatherDisplay}>
                <Text style={styles.weeklyWeatherText}>{item.day}</Text>
                <Text style={{...styles.weeklyWeatherText, marginLeft : 'auto', marginRight : 30}}>L: {item.low}°</Text>
                <Text style={styles.weeklyWeatherText}>H: {item.high}°</Text>
              </View>
              )
              
      })}
      </View>
}
         {uvIndexData && airQualityData &&
      <View style={{flex : 1, flexDirection : 'row'}}>
          <View style={styles.UVIndexView}>
          <Text style={{color : 'white'}}>UV INDEX</Text>
          <Text style={{color : 'white', fontSize : 20, textAlign: 'center'}}>{uvIndexData}</Text>
          </View>
         
          <View style={styles.airQualityView}>
        <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 13}}>AIR QUALITY</Text>
        <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 20, textAlign : 'center'}}>{airQualityData}</Text>
        </View>
         
          
        </View>
}

          
         
      </ScrollView> 
      </ImageBackground>

   
      );
    }
    
    const styles = StyleSheet.create({
    
      currentWeatherDisplay : {
        alignItems: 'center',
        fontFamily: 'Roboto',
        marginBottom : 30
      },
    
      hourlyWeatherList : {
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
        marginLeft : 18,
        marginRight : 18,
        borderRadius : 10,
        marginBottom : 10,
        padding : 8
      },
    
      hourlyWeatherDisplay : {
        alignItems: 'center',
        marginRight : 18
    
      },
    
      weeklyWeatherDisplay : {
        flexDirection : 'row',
        marginBottom : 10,
        marginTop : 10
      },
      weeklyWeatherList : {
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
        marginLeft : 18,
        marginRight : 18,
        borderRadius : 10,
        marginBottom : 10,
        padding : 8
      },
      weeklyWeatherText : {
        color : 'white',
        fontSize : 20,
        fontFamily : 'Roboto'
      },
    
      airQualityView : {
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
        marginLeft : 18,
        marginRight : 18,
        marginBottom : 10,
        padding : 8,
        borderRadius : 10
      },
    
      UVIndexView : {
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
        marginLeft : 18,
        marginRight : 18,
        padding : 8,
        borderRadius : 10,
        marginBottom : 10,
      }
    
    });
    
    export default WeatherPage;
    