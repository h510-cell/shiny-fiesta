import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {appTabNavigator} from './appTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarterScreen from '../screens/MyBarterScreen'
import NotificationScreen from '../screens/NotificationScreen';
import MyRecievedItemsScreens from '../screens/MyRecievedItemScreen';

import Icon from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:appTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name ="home" type='fontawesome5'/>
        }
    },
    Setting:{
        screen : SettingScreen,
        navigationOptions:{
            drawerIcon:<Icon name ="setting" type='font-awesome5'/>,
            drawerLabel:"Setting"
        }
    },
    MyBarters:{
        screen : MyBarterScreen,
        navigationOptions:{
            drawerIcon:<Icon name ="gift" type='font-awesome5'/>,
            drawerLabel:"My Barters"
        }
    },
    Notifications:{
        screen:NotificationScreen,
        navigationOptions:{
            drawerIcon:<Icon name ="bell" type='font-awesome5'/>,
            drawerLabel:"Notification"
        },
    MyRecievedItems:{
        screen : MyRecievedItemsScreens,
        navigationOptions:{
            drawerIcon:<Icon name = "gift" type='font-awesome5'/>,
            drawerLabel:"My Recieved Items"
        }
    }    
    }
    },
    {
        contentComponent:CustomSideBarMenu
    },
    {
        intialRouteName:'Home'
})