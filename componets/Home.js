import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Home() {

    let currentDate = new Date().toLocaleString();
    return (
        <View style={styles.container}>

            <View style={styles.rowContainer}>

                <View style={styles.headerRowBox}>
                    <Text style={styles.text}>
                        Locations 
                    </Text>
                    <Text style={styles.text}>
                        Search 
                    </Text>
                    <Text style={styles.text}>
                        ... 
                    </Text>
                </View>

                <View>
                    <Text style={styles.text}>
                        Stamford CT
                    </Text>

                    <Text style={styles.text}>
                        {currentDate}
                    </Text>
                </View>

                <View style={styles.boxContainer}>
                    <View style={styles.box1}>
                        <Text>
                            Box 1
                        </Text>
                    </View>
                    <Text style={styles.text2}> 7 Day Forecast </Text>
                    <View style={styles.box2}>
                        <Text>
                                Results will show here
                        </Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerRowBox: {
        flex: 1,
        flexDirection: 'row', 
        //marginBottom: 36
    },
    rowContainer: {
        justifyContent: 'space-between',
    },
    text: {
        color: "black",
        paddingLeft: 2,
        paddingRight: 2
    },
    boxContainer: {
        justifyContent: 'space-between',
    },
    box1: {
        borderColor: "black",
        borderWidth: 5,
        height: 100,
        width: 250,
        paddingBottom: 20
    },
    box2: {
        borderColor: "red",
        borderWidth: 5,
        height: 350,
        alignItems: "center"
    },
    text2: {
        fontSize: 26,
        fontFamily: 'Roboto'
      }
})
