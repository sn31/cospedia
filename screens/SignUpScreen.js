import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet, ImageBackground } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';

export default class SignUp extends Component {
    state = {
        name: '',
        email: '',
    };

    render() {
        return (
            <ImageBackground source={require('../assets/images/login-pic.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.header}>
                        <Text style={styles.description}>
                            Sign up to start organizing your makeup products!
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        ref={ref => { this._nameInput = ref }}
                        placeholder="Username"
                        autoFocus={true}
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onSubmitEditing={this._next}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        ref={ref => { this._emailInput = ref }}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={this._submit}
                        blurOnSubmit={true}
                    />
                    <Button
                        title='Sign In'
                        style={styles.button}
                    />
                </View>
            </ImageBackground>
        );
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
        //backgroundColor: '#ffffff'
        paddingTop: 30
    },
    header: {
        paddingTop: 20 + Constants.statusBarHeight,
        padding: 20,
        marginTop: 140,
        paddingBottom: 5
        //backgroundColor: '#03c682'
    },
    description: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'

    },
    input: {
        margin: 30,
        marginBottom: 0,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        height: 50,
        width: 120,
        marginLeft: '32%',
    
    }
});
