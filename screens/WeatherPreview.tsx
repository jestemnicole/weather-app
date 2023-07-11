import { WeatherPreviewProps } from "../types";
import WeatherPage from "../components/WeatherPage";
import { TouchableOpacity, Text } from "react-native";

function WeatherPreview({navigation, route} : WeatherPreviewProps) : JSX.Element {
    const {location, isAdded} = route.params;
    
    const onCancelButtonPress = () => {
        navigation.goBack();
    }

    const onAddButtonPress = () => {
        navigation.navigate('Home', { newLocation: location });
    }
    

    return (
        
        <>
        <WeatherPage location={location}></WeatherPage>
         <TouchableOpacity onPress={onCancelButtonPress} style={{position : 'absolute', borderRadius : 10, left : 10, top : 10, height : 50, width : 80, backgroundColor : 'red', justifyContent : 'center'}}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 20, textAlign : 'center'}}>Cancel</Text>
         </TouchableOpacity>
         { !isAdded && 
         <TouchableOpacity onPress={onAddButtonPress} style={{position : 'absolute', borderRadius : 10, right : 10, top : 10, height : 50, width : 80, backgroundColor : 'green', justifyContent : 'center'}}>
            <Text style={{color : 'white', fontFamily : 'Roboto', fontSize : 20, textAlign : 'center'}}>Add</Text>
         </TouchableOpacity>
        }
         
        </>
        
        
        
    )
    
    
};

export default WeatherPreview;