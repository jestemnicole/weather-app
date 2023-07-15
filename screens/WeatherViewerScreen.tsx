import Swiper from 'react-native-swiper'
import WeatherPage from '../components/WeatherPage'
import { WeatherViewerProps } from '../types';
import { View, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

function WeatherViewerScreen({navigation, route} : WeatherViewerProps) : JSX.Element {
    const {locations, initialIndex} = route.params;
    
    const onButtonPress = () => {
        navigation.navigate("Home");
    }
    return (
        
        <>
        <Swiper paginationStyle={{ height : 35, bottom: 0 , backgroundColor : 'rgba(0, 0, 0, 0.8)'}} 
                activeDotStyle={{backgroundColor : 'white'}}
                dotStyle={{backgroundColor : 'gray'}}
                loop={false} 
                index={initialIndex}
        >
          
          {locations.map(location => {
            return (
                <WeatherPage key={location.id} location={location.location_name}></WeatherPage>
            )
          })}

          
        </Swiper>
        
        <Pressable style={{position : 'absolute', bottom : 2.5, right : 10}}onPress={onButtonPress}>
        <Icon name="bars" size={30} color='white'></Icon>
        </Pressable>
        </>

       
        
      
        
    )
};

export default WeatherViewerScreen;