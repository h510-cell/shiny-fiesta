import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-native-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';
import RFValue from 'react-native-responsive-fontsize';

export const appTabNavigator=createBottomTabNavigator({
   Home:{
       screen:HomeScreen,
       navigatonOptions:{
           tabBarIcon:<Image source={require("../assets/Home-icon.png")} style={{width:RFValue(20),height:RFValue(20)}}/>,
           tabBarLabel:"Home"
       }
       },
       Exchange:{
           screen:ExchangeScreen,
           navigatonOptions:{
               tabBarIcon:<Image source={require("../assets/exchange-icon.png")} style={{width:RFValue(200),height:RFValue(20)}}/>,
               tabBarLabel:"Exchange"
           }
       }
})