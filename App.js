import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import Settings from './componets/Settings';
import Home from './componets/Home';
import image from './assets/weather.jpg';
import wallpaper from './assets/wallpaper.jpg';

export default function App() {

  let name = "JP";
  return (
    <View style={styles.container}>
      <ImageBackground source={wallpaper} style={styles.wallpaper}>
        <Text style={styles.header}>Hello {name} </Text>


          <Text style={styles.text}> 
            This is your forecast 
          </Text>

          <View>
            <Image
              style={styles.image}
              source={image} />
          </View>

          <Home />

        <Settings />

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',

  },
  wallpaper:{
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    marginTop: 35,
    fontFamily: 'Roboto',
    fontSize: 26,
    alignSelf: 'center'
  },
  menu: {
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode:'contain'
  },
  imageRow: {
    flexDirection: 'row',    
    width: 250,
    height: 250,
  },
   text: {
     fontSize: 26,
     fontFamily: 'Roboto'
   }
});
