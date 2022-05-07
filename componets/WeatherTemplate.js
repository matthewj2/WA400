import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet, ImageBackground} from 'react-native';
import FutureDays from './FutureDays';

const WeatherTemplate = ({weatherData}) => {
    return (
        <ScrollView horizontal={true} style={styles.scrollView}>
            <CurrentTemp data={weatherData && weatherData.length > 0 ? weatherData[0] : {}} />
            <FutureDays data={weatherData} />
        </ScrollView>
    )
}

const CurrentTemp = ({data}) => {
    if(data && data.main) 
    {
        const img = {uri: 'http://openweathermap.org/img/w/'+ data.weather.icon +'.png'}
        console.log(img)
        return (
            <View style={styles.currentTempContainer}>
                <Image source={img} />
                <View style={styles.otherContainer}>
                    <Text style={styles.day}>{new Date(data.dt * 1000).toLocaleDateString('en-US')}</Text>
                    
                    <Text style={styles.temp}>Temp Min: {  Math.floor(((1.8 * data.main.temp_min))-459.67) }</Text>
                    
                    <Text style={styles.temp}>Temp Max: {Math.round(((1.8 * data.main.temp_max)-459.67))}</Text>
                </View>
            </View>

        )
    }
    else 
    {
        return (
            <Text></Text>
        )
    }
}

export default WeatherTemplate;
const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: '#18181bcc',
        padding:30
    },
    image: {
        width: 150,
        height: 150
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#eee',
        borderWidth:1,
        padding: 15
    },
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
    otherContainer: {
        paddingRight: 40
    }
})
/*
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: StatusBar.currentHeight,
    },
    wallpaper:{
        flex: 1,
        resizeMode: "cover",
        alignItems: 'center'
    },
    scollView: {
        backgroundColor: '#FFF',
        width: 375
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    imageBox: {
        height: 470,
    },
    text: {
      fontSize: 26,
      fontFamily: 'Roboto',
    },
    viewBox: {
     alignItems: 'center'
    }
  });*/