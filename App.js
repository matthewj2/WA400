import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  Component } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native';

import PredictedWeather from './componets/PredictedWeather';
import LiveForecast from './componets/LiveForecast';
import Settings from './componets/Settings';
import Home from './componets/Home';
import image from './assets/weather-removebg-preview.png';
import wallpaper from './assets/background.jpeg';
import { Button } from 'react-native-web'; 


const Stack = createStackNavigator();
export default class App extends Component {
  render() 
  {
    const HomeNav = () => (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={PredictedWeather} />
          <Stack.Screen name="Live" component={LiveForecast} />
        </Stack.Navigator>
      </NavigationContainer>
    )
    return (
      <HomeNav />
    )
  }
}

// Old
/*
export default function App() {

//let name = "JP";
return (
  //<View contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}>
  
  <View style={styles.container}>
    <ImageBackground source={wallpaper} style={styles.wallpaper}>
      <Text style={styles.header}>Weather Forecast</Text>
      <View style={styles.viewBox}>
      <Image
          style={styles.image}
          source={image} />
          
        <ScrollView>
          <PredictedWeather />
        </ScrollView>

        <Text> Random Text 1 </Text>
      </View>
      </ImageBackground>
  </View>
);
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    //alignItems: 'center',

  },
  wallpaper:{
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    marginTop: 35,
    fontFamily: 'monospace',
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: "bold"
  },
  image: {
    //flex: 1,
    width: 200,
    height: 120,
    //resizeMode:'contain'
  },
  imageRow: {
    flexDirection: 'row',    
    width: 250,
    height: 250,
  },
   text: {
     fontSize: 26,
     fontFamily: 'Roboto'
   },
   viewBox: {
    alignItems: 'center'
   }
});
