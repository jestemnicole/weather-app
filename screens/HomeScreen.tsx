import { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import { SearchBar} from  '@rneui/themed';
import WeatherCard from '../components/WeatherCard';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import FRONTEND_URL = require('../config/config');
import axios from 'axios';
import { HomeProps, LocationInterface } from '../types';
import {REACT_APP_PLACES_API_KEY} from '@env';


function HomeScreen({ navigation, route } : HomeProps) : JSX.Element {
    const [myLocations, setMyLocations] = useState<LocationInterface[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBarFocus, setSearchBarFocus] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    
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

    useEffect(() => {
        if (route.params?.newLocation){
            
            const fetchWeatherCardData = async () => {
            
                const updatedLocations : LocationInterface[] = [];
                updatedLocations.push(...myLocations);
               
                    try {
                        const response = await axios.get(`${FRONTEND_URL}/weathercard/${route.params?.newLocation}`)
                        updatedLocations.push(response.data);
                    } catch (e){
                        console.error(e);
                    }
                


    
                setMyLocations(updatedLocations);
            }

            fetchWeatherCardData();

        }

    }, [route.params?.newLocation])
    
    const onChangeSearch = (query : string) => {

        setSearchQuery(query);
    }

    useEffect(() => {

        const fetchLocationSuggestions = async () => {

            const newResults : string[] = [];

            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&types=(cities)&key=${REACT_APP_PLACES_API_KEY}`);
                
                for (let suggestion of response.data.predictions){
                    newResults.push(suggestion['description']);
                }
            
            } catch(e){
                console.error(e);
            }

            setSearchResults(newResults);
        }

        fetchLocationSuggestions();


    }, [searchQuery])

    const onDeletePress = (location : LocationInterface) => {
            const newLocations : LocationInterface[] = [];

            myLocations.map(item => {
               
                if (item.id !== location.id){
                    newLocations.push(item);
                }
            })
            setMyLocations(newLocations);
    };

    

    
    const navigateToWeatherViewer = (index: number) => {
        navigation.navigate('WeatherViewer', {locations : myLocations, initialIndex : index});
        
    };

      const onSearchBarFocus = () => {
       
        setSearchBarFocus(!searchBarFocus);
        
      };

      const onSearchBarBlur = () => {
            setSearchBarFocus(!searchBarFocus);
            setSearchQuery('');
      };

      const isLocationInList = (location : string) => {
        
        for (const item of myLocations){
            if (item.location_name === location) return true;
        }

        return false;
      }

      const onpress = (location : string) => {
        let isAdded = isLocationInList(location);
        navigation.push('WeatherPreview', {location : location, isAdded : isAdded});
      }


    return ( 
        <View style={{flex : 1, backgroundColor : 'black', paddingTop : 20, paddingLeft : 10, paddingRight : 10}}>
            <Text style={{color : 'white', fontSize : 40, marginBottom : 10}}>Weather</Text>  
            
            <View style={searchBarFocus ? styles.searchBarFocused : styles.searchBarBlurred}>
            <FlatList   
                        keyboardShouldPersistTaps='handled'
                        ListHeaderComponent={
                        <SearchBar  
                            platform = 'default'
                            containerStyle={{marginBottom : 10}}
                            placeholder="Type Here..."
                            onChangeText={onChangeSearch}
                            onFocus={onSearchBarFocus}
                            onBlur={onSearchBarBlur}
                            blurOnSubmit={false}
                            value={searchQuery}>
                        </SearchBar>
                        } 
                        data={searchResults} 
                        
                        renderItem={({item}) => 
                        
                        <Pressable onPress={() => onpress(item)}>
                            <Text style={{color : 'white', fontSize : 20}}>{item}</Text>
                        </Pressable>
                
            }
            keyExtractor={item => item}></FlatList>
            </View>
            
            {searchQuery.length == 0 ? <ScrollView style={searchBarFocus ? {opacity : 0.5} : null}>
                <GestureHandlerRootView>
            {myLocations.map((item , index) => {
            
                
                   return (
                    <WeatherCard key={item.location_name} index={index} location={item} onDelete={onDeletePress} onPress={navigateToWeatherViewer}></WeatherCard>
                    
                   ) 
            })}
            </GestureHandlerRootView>
            </ScrollView> : null}
            
        </View>
      
    );
}

const styles = StyleSheet.create({

    searchBarFocused : {
        position : 'absolute',
        top : 0,
        left : 0, 
        right : 0
    },
    searchBarBlurred : {
        position : 'relative',
        top : 'auto',
        left : 'auto',
        right : 'auto'
    }


})

export default HomeScreen;