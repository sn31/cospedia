import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/app-name.png')} style={styles.appLogo}></Image>
                </View>

                <TextInput style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Reset Password" onPress={this.onResetPasswordPress} style={styles.button}/>
                <Button title="Back to Login" onPress={this.onBackToLoginPress} style={styles.button}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        padding: 20,
        paddingBottom: 5,
        alignItems: 'center'
    },
    description: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    input: {
        margin: 30,
        marginBottom: 0,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#861D41',
        borderWidth: 1,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        height: 50,
        width: 200,
        
    },

    appLogo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30
    }

});