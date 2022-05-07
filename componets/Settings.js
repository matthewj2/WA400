import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={styles.rowBox}>
                <View style={styles.rowContainer}>
                    <Text>Location </Text>
                    <Text>Home </Text>
                    <Text>Settings </Text>
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
    rowBox: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    rowContainer: {
        flexDirection: 'row', 
    }
})
