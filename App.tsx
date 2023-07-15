import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import WeatherViewer from './screens/WeatherViewerScreen';
import { RootParamList } from './types';
import WeatherPreview from './screens/WeatherPreviewScreen';

const Stack = createStackNavigator<RootParamList>();

function App(): JSX.Element {
 
  return ( 
    
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='WeatherViewer' component={WeatherViewer} options={{headerShown : false}}></Stack.Screen>
      <Stack.Screen name='WeatherPreview' component={WeatherPreview} options={{headerShown : false}}></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
   
  );
}



const styles = StyleSheet.create({

  

});

export default App;
