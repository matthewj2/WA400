import * as React from 'react';
import { View, Button, Text, StyleSheet, Image,ImageBackground, ScrollView, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Component } from 'react';
import axios, { Axios } from 'axios';
global.Buffer = global.Buffer || require('buffer').Buffer
import WeatherTemplate from './WeatherTemplate';
import wallpaper from './../assets/background.jpeg';

class LiveForecast extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            update: false,
            bgColor:"blue",
            btnStatus: false,
            apiKey: "8a049ac32dc5b7559386508f4fbd6cca",
            city: "",
            stateF: "",
            country: "",
            foreOBJ: {
                tempMin: "",
                tempMax: "",
                humid: ""
            },
            lon: "",
            lat: "",
            fiveDayArr: [{dt: "",
                            main: {tempMin: "", tempMax: "",} }],
            data: [{}]
            
        }
    }
    handleCity = (text) => {
        this.setState({city:text})
    }
    
    handleState = (text) => {
        this.setState({stateF:text})
    }
    
    handleCountry = (text) => {
        this.setState({country:text})
    }

    async componentDidUpdate() {
        if(this.state.update !== false)
        {
            await this.setState({update: false})
        }
    }

    callAPI = async () => {

        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city},${this.state.stateF},${this.state.country}&limit=2&appid=${this.state.apiKey}`)
            .then(res => {
                this.setState({lat: res.data[0].lat})
                this.setState({lon: res.data[0].lon})

            }).catch(res => {
                //console.log(res.data)
            })

        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.state.apiKey}`)
            .then(res => {
                this.setState({
                    foreOBJ: {
                        tempMin: Math.floor(((1.8 * res.data.main.temp_min)-459.67)),
                        tempMax: Math.floor(((1.8 * res.data.main.temp_max)-459.67)),
                        humid: res.data.main.humidity
                    }
                })

            }).catch(res => {
                console.log(res.data)
            })

        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.state.apiKey}`)
            .then(res => {
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(0,1))})
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(5,6))})
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(10,11))})
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(23,24))})
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(30,31))})
                this.setState({data: this.state.data.concat(Object.values(res.data.list).slice(36,37))})

            }).catch(res => {
                console.log(res.data)
            })
    }
    render() 
    {
        return (
            <View style={styles.container}>
                <ImageBackground source={wallpaper} style={styles.image}>
                    <View style={styles.header}>
                        <Text style={styles.header}> Live Forecast </Text>
                        <TextInput
                            style={styles.viewBox}
                            placeholder="City"
                            onChangeText={(text) => this.handleCity(text)} />

                        <TextInput
                            style={styles.viewBox}
                            placeholder="State"
                            onChangeText={(text) => this.handleState(text)} />

                        <TextInput
                            style={styles.viewBox}
                            placeholder="Country"
                            onChangeText={(text) => this.handleCountry(text)} />

                    </View>
                    <View style={styles.buttonStyle}>
                        <Button 
                            color={this.state.bgColor}
                            onPress={this.callAPI}
                            style={styles.button}
                            title="Get Forecast" />
                    </View>

                    <View style={styles.futureForecastItemContainer}>
                        <Text style={styles.header}> Today's Forecast </Text>

                        <Text style={styles.temp}>
                            Min Temp: {this.state.foreOBJ.tempMin}
                        </Text>
                        <Text style={styles.temp}>
                            Max Temp: {this.state.foreOBJ.tempMax}
                        </Text>
                        <Text style={styles.temp}>
                            Humidity : {this.state.foreOBJ.humid}
                        </Text>
                    </View>
                    

                    <WeatherTemplate weatherData={this.state.data}/>
                </ImageBackground>

            </View>
        )
    }
}

export default LiveForecast;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image:{
      flex:1, 
      resizeMode:"cover", 
      justifyContent:"center"
    },
    header: {
        fontSize: 24,
        fontWeight:"100",
        textAlign:"center"
    },
    button: {
    },
    buttonStyle: {
        //width: '40%'
    },
    viewBox: {     
        fontSize: 14,
        fontWeight:"100",
        textAlign:"center"
    },
    futureForecastItemContainer: {
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:3,
        borderColor:"#eee",
        borderWidth:1,
        padding: 5,
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    }
  });

