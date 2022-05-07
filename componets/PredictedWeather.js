import * as React from 'react';
import { View, Button, Text, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import Plotly from 'react-native-plotly';
import axios, { Axios } from 'axios';
global.Buffer = global.Buffer || require('buffer').Buffer


import imageFile from './../assets/box.png';
import wallpaper from './../assets/background.jpeg';

class PredictedWeather extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            update: false,
            bgColor:"blue",
            btnStatus: false,
            image: "https://wallpaperaccess.com/full/1092856.jpg"
        }
    }

    async componentDidUpdate() {
        if(this.state.update !== false)
        {
            await this.setState({update: false})
        }
    }

    callAPI = () => {

        // Disable button
        this.setState({btnStatus: true})

        axios.get('https://weather-forecast-csc400.herokuapp.com/api', {responseType: 'arraybuffer'})
            .then(res => {
                const buffer = Buffer.from(res.data, 'binary').toString('base64');

                this.setState({image: 'data:image/png;base64,' + buffer})
                //console.log(this.state.image)           

                // re enable button
                this.setState({btnStatus: false})

                // Refresh state
                this.setState({update: true})
            })
    }

    render() 
    {
        return(
            <View style={styles.container}>

                <ScrollView>
                    <ImageBackground source={wallpaper} style={styles.wallpaper}>
                        <View style={styles.viewBox}>
                        
                        <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Live')}>   
                                <View>
                                    <Text> Live Forecast </Text>
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.text}>Linear Regression Model</Text>
                            <View style={styles.borderBox}>
                                <Text style={styles.textView}>
                                    Linear Regression is a type of machine learning, this performs to predict  
                                    a dependent variable value (y) based on a given independent variable (x).
                                ​</Text>
                                <Text style={styles.textView}>
                                    For example, LRM can predict the future temperature . 
                                    Linear approaches for modelling the relationship between a scalar response and one or more explanatory variables.​  
                                </Text>
                            </View>
                            <View style={styles.viewBox2}>
                                <Button 
                                    color={this.state.bgColor}
                                    onPress={this.callAPI}
                                    disabled={this.state.btnStatus}
                                    title="Predicted Weather" />    
                            </View>
                            

                            <View style={styles.imageBox}>
                                <ScrollView style={styles.scollView}
                                    horizontal={true}
                                >
                                    
                                <Image
                                    style={{width: 450, height:470}}
                                    source={{uri: this.state.image}} 
                                />
                            
                                </ScrollView>
                            </View>
                            <View style={styles.viewBox2}>
                                <View style={styles.borderBox}>
                                    <Text style={styles.textView}>
                                        This table compares the "Actual Temp" and "Predicted Temp." As you can see the predicted temperatures are not that off, 
                                        they are close to the actual temperatures. The picture demonstrates a line chart of comparing the actual temperature (blue) and predicted temperature (orange). 
                                        The x-axis are the dates and y-axis is the temperatures. 
                                    ​</Text>
                                </View>
                            </View>

                            
                                
                            </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}

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
    borderBox: {
        borderWidth: 2
    },
    text: {
      fontSize: 26,
      fontFamily: 'Roboto',
    },
    textButton: {
      fontSize: 26,

      fontFamily: 'Roboto',
    },
    textView: {
      fontSize: 16,
      fontFamily: 'Roboto',
    },
    viewBox: {
     alignItems: 'center'
    },
    viewBox2: {
     paddingTop: 5,
     paddingBottom: 5
    }
  });

  export default PredictedWeather;