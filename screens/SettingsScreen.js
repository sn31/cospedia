import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RkButton, RkCard } from 'react-native-ui-kitten';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {

    return (
      <View>
        
        <RkCard>
          <View rkCardHeader style={styles.container}>
            <Text>User Profile</Text>
          </View>
          <Image rkCardImg source={require('../assets/images/homepage.jpg')} />
          <View rkCardContent>
            <Text> quick brown fox jumps over the lazy dog</Text>
          </View>
          <View rkCardFooter>
            <Text>Footer</Text>
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
    flex: 1,
    backgroundColor: '#861D41',
  }
});