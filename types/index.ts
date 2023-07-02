import { StackScreenProps } from "@react-navigation/stack";

export type LocationInterface = {
    id : string,
    location_name : string,
    localtime : string,
    weather_desc : string,
    current_temp : string,
    high : string,
    low : string
};

export type WeeklyWeatherInterface = {
    day : string,
    icon : string,
    low : number,
    high : number
};

export type RootParamList = {
    Home: undefined;
    WeatherViewer: {locations : LocationInterface[] , initialIndex : number};
};

export type HomeProps = StackScreenProps<RootParamList, 'Home'>;
export type WeatherViewerProps = StackScreenProps<RootParamList, 'WeatherViewer'>;

export type WeatherCardProps = {
    location: LocationInterface,
    onDelete: (loc: LocationInterface) => void,
    onPress : (index : number) => void,
    index : number
};