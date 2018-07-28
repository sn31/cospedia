import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Header from './components/Header';
import SignUp from './screens/SignUpScreen.js';
import * as firebase from 'firebase';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    
  };

  render() {
    
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      //Before retuning AppNavigator, the user must sign up or sign in first.
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Header/>
          <SignUp/> 
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

}

const firebaseConfig = {
  apiKey: "AIzaSyCsXeeqQGEXp7WQAB7WU4blJmS0rCIAZaU",
  authDomain: "makeup-genius-702f9.firebaseapp.com",
  databaseURL: "https://makeup-genius-702f9.firebaseio.com",
  projectId: "makeup-genius-702f9",
  storageBucket: "makeup-genius-702f9.appspot.com",
  messagingSenderId: "416277350179"
};
  firebase.initializeApp(firebaseConfig);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

