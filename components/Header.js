import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component {

    render () {
        return (
            <View style ={styles.header}>
             <Text style={styles.header_text}> Cospedia</Text>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        paddingTop:35,
        paddingBottom: 0,
        backgroundColor: '#ffffff'
    },

    header_text: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
});

export {Header}