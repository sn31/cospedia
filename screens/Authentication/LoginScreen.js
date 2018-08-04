import React from 'react';
import { StatusBar,Image, StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        this.props.navigation.navigate('Signup');
    }
    onForgotPasswordPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [StackActions.navigate({routeName: "ForgotPassword"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
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

                <View style={{paddingTop:10}} />

                <TextInput style={styles.input}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Login" onPress={() => this.onLoginPress()} />
                <Button title="Create account..." onPress={this.onCreateAccountPress} />
                <Button title="Forgot Password..." onPress={this.onForgotPasswordPress} />
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
        marginLeft: '20%'
    },

    appLogo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30
    }

});