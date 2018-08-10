import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';

export default createBottomTabNavigator(
  {
    Test: {
      screen: HomeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Test':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
        }
        return
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />;
      },
    }),
    // tabBarComponent: TabBarBottom,
    // tabBarPosition: 'bottom',
    // animationEnabled: false,
    // swipeEnabled: false,
  }
);