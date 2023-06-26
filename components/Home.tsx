import { useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
import { SearchBar} from  '@rneui/themed';
import WeatherCard from './WeatherCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type WeatherPageNavigationProp = NativeStackNavigationProp<StackParamList, 'WeatherPage'>;

type StackParamList = {
    Home: undefined;
    WeatherPage: {location : string};
  };

const locations = [
    {id : 0,
    location_name : 'New York',
    location_time : '11:59 PM',
    weather_desc : 'Cloudy',
    temperature : '66°',
    high : '77°',
    low : '60°'
    },

    { id : 1,
    location_name : 'New Yoresfdk',
    location_time : '11:59 PM',
    weather_desc : 'Cloudy',
    temperature : '66°',
    high : '77°',
    low : '60°'
    },

    { id : 2,
    location_name : 'New Yodfdgdrk',
    location_time : '11:59 PM',
    weather_desc : 'Cloudy',
    temperature : '66°',
    high : '77°',
    low : '60°'
    }
    
]

type locationInterface = {
    id : number,
    location_name : string,
    location_time : string,
    weather_desc : string,
    temperature : string,
    high : string,
    low : string
}


function Home() : JSX.Element {
    const [myLocations, setMyLocations] = useState(locations);
    const [searchQuery, setSearchQuery] = useState('');
    
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

    const navigation = useNavigation<WeatherPageNavigationProp>();
    
    const navigateToWeatherPage = (location: locationInterface) => {
        navigation.navigate('WeatherPage', {location : location.location_name});
        
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
            {myLocations.map(item => {
                
                   return (
                    <WeatherCard location={item} onDelete={onDeletePress} onPress={navigateToWeatherPage}></WeatherCard>
                    
                   ) 
            })}
            </GestureHandlerRootView>
            </ScrollView>
        </View>
      
    );
}

export default Home;