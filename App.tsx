import React from 'react';
import {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {IP, PORT} from './config/config.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList
} from 'react-native';



function App(): JSX.Element {
 
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<any>(null);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState<any>(null);


    const fetchWeatherData = async (url : string, setWeatherData : React.Dispatch<any>) => {
        try {
         
          const response = await fetch(url);
          
          if (response.ok){
            const data = await response.json();
            setWeatherData(data);
          }else{
            throw new Error('Failed to fetch data');
          }
        } catch (e){
          console.error(e);
        }
    }

    useEffect(() => {
      
        const currentWeatherURL = `http://${IP}:${PORT}/api/weather/current/london`;
        const hourlyWeatherURL = `http://${IP}:${PORT}/api/weather/hourly/london`;
        const weeklyWeatherURL = `http://${IP}:${PORT}/api/weather/weekly/london`;
        fetchWeatherData(currentWeatherURL, setCurrentWeatherData);
        fetchWeatherData(hourlyWeatherURL, setHourlyWeatherData);
        fetchWeatherData(weeklyWeatherURL, setWeeklyWeatherData);
      
      }, []);

    type weeklyWeatherInterface = {
      day : string,
      icon : string,
      low : number,
      high : number
    }
      
  return ( 
    <SafeAreaView style={styles.mainViewStyle}>
      <ScrollView>
      {currentWeatherData && <View style={styles.currentWeatherDisplay}>
        <Text style={{fontSize: 40,
                      marginTop: 30,
                      color : 'black'}}>{currentWeatherData.location.name}</Text>
        <Text style={{fontSize: 80, color : 'black'}}>{Math.round(currentWeatherData.current.temp_f)}°</Text>
        <Text style={{fontSize: 20, color : 'black', marginBottom: 10}}>{currentWeatherData.current.condition.text}</Text>
      </View>}

    {<FlatList style={styles.hourlyWeatherList} data={hourlyWeatherData}
              renderItem={({item}) => 
                <View style={styles.hourlyWeatherDisplay}>
                  <Text style={{color : 'black', fontFamily: 'Roboto'}}>{item.time}</Text>
                  <Image source={{uri : 'https:' + item.icon}}
                          style={{width: 50, height: 50}}></Image>
                  <Text style={{color : 'black', fontFamily: 'Roboto'}}>{item.temp_f}</Text>
                </View>}
               horizontal={true}>
      </FlatList>}

      {weeklyWeatherData && weeklyWeatherData.map((item : weeklyWeatherInterface) => {
              return (
              <View style={styles.weeklyWeatherDisplay}>
                <Text style={styles.weeklyWeatherText}>{item.day}</Text>
                <Text style={styles.weeklyWeatherText}>low: {item.low}</Text>
                <Text style={styles.weeklyWeatherText}>high: {item.high}</Text>
              </View>
              )
              
      })}
         
         

          
         
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  mainViewStyle: {
      backgroundColor : 'white'
  },

  currentWeatherDisplay : {
    alignItems: 'center',
    fontFamily: 'Roboto'
  },

  hourlyWeatherList : {
    backgroundColor : 'white',
    borderRadius : 10
  },

  hourlyWeatherDisplay : {
    alignItems: 'center',
    marginBottom: 10,

  },

  weeklyWeatherDisplay : {
    flexDirection : 'row',
    marginBottom : 10
  },

  weeklyWeatherText : {
    marginRight : 10,
    color : 'black'
  }
});

export default App;
