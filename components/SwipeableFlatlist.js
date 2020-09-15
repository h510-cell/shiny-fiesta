import React, { Component } from 'react';
import{
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {SwipeableListView} from 'react-native-swipe-list-view';
import db from '../Config';

export default class SwipeableFlatList extends Component{
constructor(){
    super()
    this.state={
        allNotification:this.props.allNotification
    }
}

updateMarkAsRead=(Notification)=>{
 db.collection('all_notification').doc(Notification.doc_id).update({
     'notification_status' : "read"
 })
}

onSwipeValueChange=swipeData =>{
  var allNotification = this.state.allNotification
  const {key,value} = swipeData;

  if(value <-Dimensions.get('window').width){
   const newData = [...allNotification];
   const prevIndex = allNotification.findIndex(item=>item.key===key);
   this.updateMarkAsRead(allNotification[prevIndex]);
   newData.splice(prevIndex,1)   
   this.setState({allNotification:newData});
  };
};

render(){
    return(
    <View style={styles.container}>
        <SwipeableListView
        data = {this.state.allNotification}
        onSwipeValueChange = {this.onSwipeValueChange}
        />
    </View>    
    )
}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    }
})