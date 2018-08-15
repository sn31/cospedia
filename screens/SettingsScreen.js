import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RkButton, RkCard, RkTheme } from 'react-native-ui-kitten';



export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {

    return (
      <View rkCardHeader style={styles.container}>
        <RkCard>
          <View>
            <Text style={styles.text}>User Profile</Text>
          </View>
          <Image rkCardImg source={require('../assets/images/homepage.jpg')} />
          <View rkCardContent>
            <Text> Here's where your beauty profile will be!</Text>
          </View>
        </RkCard>
        <RkButton>Click me!</RkButton>
      </View>
    )

      ;
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#861D41',
  },

  text: {
    color: 'black',
    fontSize: 16,
  }
});

