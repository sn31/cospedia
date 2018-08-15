import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';

export const DrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Settings: { screen: SettingsScreen }
    },
)

