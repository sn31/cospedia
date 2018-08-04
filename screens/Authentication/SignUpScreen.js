import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';
import { StackActions} from 'react-navigation';
import * as firebase from 'firebase';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: "",
            authenticating: false
        };
    }

    onPressSignUp() {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [StackActions.navigate({routeName: 'Login'})]
        });
        this.props.navigation.dispatch(navActions);
    }

    renderCurrentState() {
        if (this.state.authenticating) {
            return (
                <View>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                    <Image source={require('../../assets/images/app-name.png')} style={styles.appLogo}></Image>
                </View>

                <TextInput style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput style={styles.input}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput style={styles.input}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button onPress={() => this.onPressSignUp()}
                    title='Sign Up' //needs to change the text color here
                    style={styles.button}
                    backgroundColor='#861D41'
                />

                <Button onPress={() => this.onBackToLogInPress()}
                    title="Back to Login" //needs to change the text color here
                    style={styles.button} 
                    backgroundColor='#861D41'
                />

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        )
    }
    _next = () => {
        this._emailInput && this._emailInput.focus();
    };

    _submit = () => {
        alert(`Welcome, ${this.state.name}! Confirmation email has been sent to ${this.state.email}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: 20 + Constants.statusBarHeight,
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
        marginLeft: '20%'
    },

    appLogo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30
    }

});
