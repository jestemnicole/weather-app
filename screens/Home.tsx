import { useState, useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { SearchBar} from  '@rneui/themed';
import WeatherCard from '../components/WeatherCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FRONTEND_URL = require('../config/config');
import axios from 'axios';
import { HomeProps, LocationInterface } from '../types';

const locations = [
    {id : '0',
    location_name : 'New York',
    localtime : '11:00PM',
    weather_desc : 'Cloudy',
    current_temp : '60',
    high : '70',
    low : '58'
    },

    {id : '1',
        location_name : 'Warsaw',
        localtime : '11:00PM',
        weather_desc : 'Cloudy',
        current_temp : '60',
        high : '70',
        low : '58'
        },

]

function Home({ navigation } : HomeProps) : JSX.Element {
    const [myLocations, setMyLocations] = useState<LocationInterface[]>(locations);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {

        const fetchWeatherCardData = async () => {
            
            const updatedLocations : LocationInterface[] = [];
            
            for (const location of myLocations){

                try {
                    
                    const response = await axios.get(`${FRONTEND_URL}/weathercard/${location.location_name}`)
                    updatedLocations.push(response.data);
                } catch (e){
                    console.error(e);
                }
            }

            setMyLocations(updatedLocations);
        }

        fetchWeatherCardData();
        
    },[]);
    
    const onChangeSearch = (query : string) => setSearchQuery(query);

    const onDeletePress = (location : LocationInterface) => {
            const newLocations : LocationInterface[] = [];

            myLocations.map(item => {
               
                if (item.id !== location.id){
                    newLocations.push(item);
                }
            })
            setMyLocations(newLocations);
    }

    
    const navigateToWeatherViewer = (index: number) => {
        navigation.navigate('WeatherViewer', {locations : myLocations, initialIndex : index});
        
      };

    return ( 
        <View style={{flex : 1, backgroundColor : 'black', paddingTop : 20, paddingLeft : 20, paddingRight : 20}}>
            <Text style={{color : 'white', fontSize : 40, marginBottom : 10}}>Weather</Text>  
            <SearchBar  
                        platform = 'default'
                        containerStyle={{marginBottom : 10}}
                        placeholder="Type Here..."
                        onChangeText={onChangeSearch}
                        
                       value={searchQuery}>
            </SearchBar>

            <ScrollView>
                <GestureHandlerRootView>
            {myLocations.map((item , index) => {
            
                
                   return (
                    <WeatherCard key={item.id} index={index} location={item} onDelete={onDeletePress} onPress={navigateToWeatherViewer}></WeatherCard>
                    
                   ) 
            })}
            </GestureHandlerRootView>
            </ScrollView>
        </View>
      
    );
}

export default Home;