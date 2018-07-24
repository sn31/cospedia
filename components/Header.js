import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component {

    render () {
        return (
            <View style ={styles.header}>
             <Text style={styles.header_text}> Makeup Journal</Text>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        //flexDirection: 'column',
        //alignSelf: 'stretch',
        paddingTop:35,
        paddingBottom: 0,
        backgroundColor: '#df80ff'
    },

    header_text: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
});