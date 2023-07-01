import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './components/Home';
import WeatherViewer from './components/WeatherViewer';

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


const Stack = createStackNavigator<RootParamList>();

function App(): JSX.Element {
 
  return ( 
    
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='WeatherViewer' component={WeatherViewer} options={{headerShown : false}}></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
   
  );
}



const styles = StyleSheet.create({

  

});

export default App;
