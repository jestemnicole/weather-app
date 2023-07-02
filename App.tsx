import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './screens/Home';
import WeatherViewer from './screens/WeatherViewer';
import { RootParamList } from './types';



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
