import Swiper from 'react-native-swiper'
import WeatherPage from './WeatherPage'
import { StackScreenProps } from '@react-navigation/stack'

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


type WeatherViewerProps = StackScreenProps<RootParamList, 'WeatherViewer'>;

function WeatherViewer({navigation, route} : WeatherViewerProps) : JSX.Element {
    const {locations, initialIndex} = route.params;

    return (


        <Swiper loop={false} index={initialIndex}>
          {locations.map(location => {
            return (
                <WeatherPage location={location.location_name}></WeatherPage>
            )
          })}
        </Swiper>
        
        
    )
};

export default WeatherViewer;