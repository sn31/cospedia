import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import DrawerContent from './SideMenuContent';

export const DrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeScreen },
        // Login: { screen: LoginScreen },
        // Settings: { screen: SettingsScreen },
    },
    {
        contentComponent: DrawerContent,
        drawerWidth: 250,
        drawerPosition: 'left',
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);