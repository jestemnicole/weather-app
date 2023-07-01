import React from 'react';
import {useState, useEffect} from 'react';
import FRONTEND_URL from '../config/config.js';
import axios from 'axios';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    FlatList,
    ImageBackground,
    Platform,
    PermissionsAndroid
  } from 'react-native';

type locationInterface = {
    latitude : number,
    longitude : number
  }
function WeatherPage(): JSX.Element {
 
    const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
    const [hourlyWeatherData, setHourlyWeatherData] = useState<any>(null);
    const [weeklyWeatherData, setWeeklyWeatherData] = useState<any>(null);
    const [airQualityData, setAirQualityData] = useState('');
    const [uvIndexData, setUvIndexData] = useState('');
    //const [location, setLocation] = useState<locationInterface | null>(null);
  
      /*async function requestLocation() {
         try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title : 'Location Permission',
                message : 'tell me coords ',
                buttonPositive : 'SURE',
              });
  
              console.log("permission result : ", granted);
  
              if (granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log("granted!")
                
                Geolocation.getCurrentPosition( position => {
  
                  const currentPosition = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                  };
            
                  setLocation(currentPosition);
                  
              }, error => {
                console.log(error)
              },
              {enableHighAccuracy : true, timeout: 15000, maximumAge: 10000})
              }else{
                console.log('ok so no coords')
              }
   
              
  
         }catch(e){
            console.error(e)
         }
      }*/
  
      
       
     
      async function fetchWeatherData(url : string, setWeatherData : React.Dispatch<any>) {
          try {
           
            const response = await axios(url);
            setWeatherData(response.data);
            
          } catch (e){
            console.error(e);
          }
      }
      //useEffect(() => {
        //requestLocation();
      //}, []);
  
  
      useEffect(() => {
        //if (location){
  
          const currentWeatherURL = `${FRONTEND_URL}/current/london`;
          const hourlyWeatherURL = `${FRONTEND_URL}/hourly/london`;
          const weeklyWeatherURL = `${FRONTEND_URL}/weekly/london`;
          const airQualityURL = `${FRONTEND_URL}/airquality/london`;
          const uvURL = `${FRONTEND_URL}/uv/london`;
          
          fetchWeatherData(currentWeatherURL, setCurrentWeatherData);
          fetchWeatherData(hourlyWeatherURL, setHourlyWeatherData);
          fetchWeatherData(weeklyWeatherURL, setWeeklyWeatherData);
          fetchWeatherData(airQualityURL, setAirQualityData);
          fetchWeatherData(uvURL, setUvIndexData);
        //}
          
        }, []);
  
      type weeklyWeatherInterface = {
        day : string,
        icon : string,
        low : number,
        high : number
      }


      return (

      //<ImageBackground source={require('../assets/blue_sky.jpg')}>
      <ScrollView>
      {currentWeatherData && <View style={styles.currentWeatherDisplay}>
        <Text style={{fontSize: 40,
                      marginTop: 30,
                      color : 'white', fontFamily : 'Roboto', textShadowColor : 'rgba(0, 0, 0, 0.6)', textShadowRadius : 1, textShadowOffset : {width : -1, height : 1}}}>{currentWeatherData.location.name}</Text>
        <Text style={{fontSize: 80, color : 'white', fontFamily : 'Roboto', textShadowColor : 'rgba(0, 0, 0, 0.6)', textShadowRadius : 1, textShadowOffset : {width : -1, height : 1}}}>{Math.round(currentWeatherData.current.temp_f)}°</Text>
        <Text style={{fontSize: 20, color : 'white', marginBottom: 10, textShadowColor : 'rgba(0, 0, 0, 0.6)', textShadowRadius : 1, textShadowOffset : {width : -1, height : 1}}}>{currentWeatherData.current.condition.text}</Text>
      </View>}

    {<FlatList style={styles.hourlyWeatherList} data={hourlyWeatherData}
              renderItem={({item}) => 
                <View style={styles.hourlyWeatherDisplay}>
                  <Text style={{color : 'white', fontFamily: 'Roboto', fontSize : 15}}>{item.time}</Text>
                  <Image source={{uri : 'https:' + item.icon}}
                          style={{width: 40, height: 40}}></Image>
                  <Text style={{color : 'white', fontFamily: 'Roboto', fontSize : 20}}>{item.temp_f}</Text>
                </View>}
               horizontal={true}>
      </FlatList>}

      <View style={styles.weeklyWeatherList}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 13}}>3-DAY FORECAST</Text>
      {weeklyWeatherData && weeklyWeatherData.map((item : weeklyWeatherInterface) => {
              return (
              <View key={item.day} style={styles.weeklyWeatherDisplay}>
                <Text style={styles.weeklyWeatherText}>{item.day}</Text>
                <Text style={{...styles.weeklyWeatherText, marginLeft : 'auto', marginRight : 30}}>L: {item.low}°</Text>
                <Text style={styles.weeklyWeatherText}>H: {item.high}°</Text>
              </View>
              )
              
      })}
      </View>
         
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
         

          
         
      </ScrollView>  //</ImageBackground>
   
      );
    }
    
    const styles = StyleSheet.create({
    
      currentWeatherDisplay : {
        alignItems: 'center',
        fontFamily: 'Roboto',
        marginBottom : 20
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
    