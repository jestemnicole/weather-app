import { useState, useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { SearchBar} from  '@rneui/themed';
import WeatherCard from './WeatherCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FRONTEND_URL = require('../config/config');
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack'


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

type locationInterface = {
    id : string,
    location_name : string,
    localtime : string,
    weather_desc : string,
    current_temp : string,
    high : string,
    low : string
   
}
type RootParamList = {
    Home: undefined;
    WeatherViewer: {locations : locationInterface[] , initialIndex : number};
  };

type HomeProps = StackScreenProps<RootParamList, 'Home'>;

function Home({ navigation } : HomeProps) : JSX.Element {
    const [myLocations, setMyLocations] = useState<locationInterface[]>(locations);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {

        const fetchWeatherCardData = async () => {
            
            const updatedLocations : locationInterface[] = [];
            
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

    const onDeletePress = (location : locationInterface) => {
            const newLocations : locationInterface[] = [];

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