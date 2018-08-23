import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {BarCodeScanner, Permissions} from 'expo';

import ScanIcon from '../components/ScanIcon';
import SettingsIcon from '../components/SettingsIcon';
import HomeIcon from '../components/HomeIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/Authentication/SignUpScreen.js';
import LoginScreen from '../screens/Authentication/LoginScreen.js';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen.js';
import { DrawerNavigator } from '../navigation/SideMenuNavigator';
import { Icon } from '../node_modules/react-native-elements';

const MainTabNavigator = createStackNavigator({
  Home: DrawerNavigator,
  Login: LoginScreen,
  Scanner: LinksScreen,
  Signup: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
},{
  navigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName,
    headerLeft: (
      <Icon
      name='menu'
      size={30}
      color={'#fff'}
      underlayColor={'#F38C9F'}
      onPress={() => navigation.openDrawer()}
      />
    ),
    headerStyle: {
      backgroundColor: '#F38C9F',
    },
    headerTitleStyle: {
      color: '#fff',
    }
  })
}

);
MainTabNavigator.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <HomeIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <ScanIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-scan'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <SettingsIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-history'}
    />
  ),
};


export default createBottomTabNavigator({
  MainTabNavigator,
  LinksStack,
  SettingsStack,
});
