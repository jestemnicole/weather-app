import {View, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRef } from 'react';

type locationInterface = {
    id : number,
    location_name : string,
    location_time : string,
    weather_desc : string,
    temperature : string,
    high : string,
    low : string
}


function WeatherCard({ location, onDelete, onPress }: { location: locationInterface; onDelete: (loc: locationInterface) => void; onPress : (loc : locationInterface) => void}) : JSX.Element {
    const swipeableRef = useRef<Swipeable>(null);
    

    const rightswipe = () => {
        return (<TouchableOpacity onPress={() => {
            onDelete(location)
            resetState()}}>
        <View  style={{backgroundColor : 'red', borderRadius : 15, marginBottom : 10, padding : 10, marginLeft : 10, justifyContent : 'center'}}>
            <Icon name="trash" size={40} color='white'></Icon>
            </View>
            </TouchableOpacity>)
    }

    const resetState = () => {
        swipeableRef.current?.close();
      };

      
      const handleCardPress = () => {
        onPress(location);
      };

    return (
            <TouchableOpacity onPress={handleCardPress}>
            <Swipeable renderRightActions={rightswipe} ref={swipeableRef}>
            <View key={location.location_name} style={{backgroundColor : 'gray', borderRadius : 15, position : 'relative', padding : 10, marginBottom : 10}}>
                <View>
                    <Text style={{color : 'white', fontSize : 20}}>{location.location_name}</Text>
                    <Text style={{color : 'white', marginBottom : 30}}>{location.location_time}</Text>
                    <Text style={{color : 'white'}}>{location.weather_desc}</Text>
                </View>

                <View style={{position : 'absolute', left : 270}}>
                    <Text style={{color : 'white', fontSize : 50}}>{location.temperature}</Text>
                    <Text style={{color : 'white'}}>H:{location.high}</Text>
                    <Text style={{color : 'white'}}>L:{location.low}</Text>
                    </View>
                </View>
            </Swipeable>
            </TouchableOpacity>
            
        )
}

export default WeatherCard;