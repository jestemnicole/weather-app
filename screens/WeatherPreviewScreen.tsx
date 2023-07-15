import { WeatherPreviewProps } from "../types";
import WeatherPage from "../components/WeatherPage";
import { TouchableOpacity, Text, View } from "react-native";

function WeatherPreviewScreen({navigation, route} : WeatherPreviewProps) : JSX.Element {
    const {location, isAdded} = route.params;
    
    const onCancelButtonPress = () => {
        navigation.goBack();
    }

    const onAddButtonPress = () => {
        navigation.navigate('Home', { newLocation: location });
    }
    

    return (
        
        
        <WeatherPage location={location}>
        <View style={{flexDirection : 'row', backgroundColor : 'transparent', justifyContent : 'space-between', padding : 10}}>
        <TouchableOpacity onPress={onCancelButtonPress} style={{ borderColor : 'white', borderWidth : 1.5, borderRadius : 10, height : 50, width : 80, backgroundColor : 'red', justifyContent : 'center'}}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 23, textAlign : 'center'}}>Cancel</Text>
         </TouchableOpacity>
         { !isAdded && 
         <TouchableOpacity onPress={onAddButtonPress} style={{  borderColor : 'white', borderWidth : 1.5,  borderRadius : 10,  height : 50, width : 80, backgroundColor : 'green', justifyContent : 'center'}}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 23, textAlign : 'center'}}>Add</Text>
         </TouchableOpacity>
        }

        </View>

        </WeatherPage>
        
         
         
       
        
        
        
    )
    
    
};

export default WeatherPreviewScreen;