import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const FutureDays = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ?
                data.map((data, idx) => (
                    idx !== 0 && <FutureDayItem key={idx} forecastItem={data} />
                ))
                :
            
        <View />
        }
    </View>
    )
}

const FutureDayItem = ({forecastItem}) => {
    return (
        <View style={styles.futureForecastItemContainer}>
            <Text style={styles.day}>{new Date(forecastItem.dt * 1000).toLocaleDateString('en-US')}</Text>
            <Text style={styles.temp}>Temp Min: {Math.floor(((1.8 * forecastItem.main.temp_min)-459.67))}</Text>
            <Text style={styles.temp}>Temp Max: {Math.floor(((1.8 * forecastItem.main.temp_max)-459.67))}</Text>
        </View>
    )
}

export default FutureDays; 
const styles = StyleSheet.create({
    image: {
        width: 100,
        height:100
    }, 
    futureForecastItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding: 20,
        marginLeft: 10
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
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
})