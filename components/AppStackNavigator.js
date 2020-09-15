import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import AppDrawerNavigator from '../components/AppDrawerNavigator';
import UserDetailsScreen from  '../screens/UserDetailsScreen';

export const AppStackNavigator = createStackNavigator({
     AppDrawerNavigator:{
         screen : AppDrawerNavigator,
         navigationOptions:{
             headerShown:false
         }
     },
     UserDetail:{
         screen : UserDetailsScreen,
         navigationOptions:{
             headerShown:false
         }
     }
})