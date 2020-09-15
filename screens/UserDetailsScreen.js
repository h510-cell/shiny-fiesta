import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../Config'
export default class UserDetailsScreen extends React.Component{
    constructor(){
        super(
            this.state={
                userId:firebase.auth().currentUser.email,
                itemDescription:this.props.navigation.state.params('details')["item_Description"],
                itemName : "iPhoneX", 
                ExchangerName : "Parth Das",
                ExchangerContact : "7773973973",
                ExchangerAddress : "",
                ExchangerId : "aagamhem",
                Exchanger_status : "approved by Exchanger"
            }
        )
}

addBarter=()=>{
    db.collection('MyBarters').add({
        itemName : "iPhoneX",
        ExchangerName : "Parth Das",
        ExchangerContact :"7773973973",
        ExchangerAddress : "",
        ExchangerId : "aagamhem",
        Exchanger_status : "approved by Exchanger"
    })
}

addNotification=()=>{
    db.collection('all_notification').add({
        "take_userId" : this.state.ExchangerId,
        "donor_id" : this.state.ExchangerAddress.userId,
        "data" : firebase.firestore.FieldValue.serverTimeStamp(),
        "message" : message,
        "itemName" : this.state.itemName,
        "notification_status" : unread,
    })
}

componentDidMount(){
    this.addBarter()
    this.addNotification()
}

render(){
    return(
      <View style={styles.container}>
           <TouchableOpacity style={styles.button}
            onPress={()=>
            this.addBarter(),
            this.addNotification()
            }>
              <Text style={styles.text}>Exchange</Text>
            </TouchableOpacity>    
      </View>    
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})