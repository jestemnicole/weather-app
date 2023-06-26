import React from 'react';
import {useState, useEffect} from 'react';
import  {PropsWithChildren} from 'react';
import FRONTEND_URL from './config/config.js';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
  ImageBackground,
  Platform,
  PermissionsAndroid
} from 'react-native';

import Home from './components/Home';
import WeatherPage from './components/WeatherPage';

type StackParamList = {
  Home: undefined;
  WeatherPage: {location : string};
};

const Stack = createNativeStackNavigator<StackParamList>();


function App(): JSX.Element {
 
  return ( 
    
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='WeatherPage' component={WeatherPage} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({

  

});

export default App;
