import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../Config'

export default class MyBarterScreen extends React.Component{

    constructor(){
        super()
        this.state={
            userId : firebase.auth().currentUser.email,
        }
    }      

    sendItem=(itemDetails)=>{
        if(itemDetails.Exchanger_status==="Item Sent"){
            var Exchanger_status="Exchanger Intersted";
          db.collection('MyBarters').update({
              Exchanger_status:"Exchanger Intersted",
          });
          this.sendNotification(Exchanger_status)
        } else{
         var Exchanger_status="Exchanger Sent";
         db.collection('MyBarters').update({
             Exchanger_status:"Exchanger Sent",
         });
         this.sendNotification(Exchanger_status)   
        }
    };
    
      sendNotification=(Exchanger_status)=>{
          db.collection('all_notification')
            .thenSnapshot((snapshot)=>{
                snapshot.forEach(doc => {
                    var message="";
                    if(Exchanger_status===ItemSent){
                        message=this.state.ExchangerName + "user has sent you the item"

                        db.collection('all_notification').update({
                            message : message,
                            notification_status : "unread",
                            date : firebase.firestore.FieldValue.serverTimestamp()
                        })
                    }
                })
            })
      }

      getAllBarters=()=>{
          this.requestRef=db.collection('MyBarters').get()
          .onsnapShot((snapshot)=>{
              var itemName=snapshot.doc.map((doc)=>doc.data())
              var ExchangerName=snapshot.doc.map((doc)=>doc.data())
              var ExchangerContact=snapshot.doc.map((doc)=>doc.data())
              var ExchangerAddress=snapshot.doc.map((doc)=>doc.data())
              var ExchangerId=snapshot.doc.map((doc)=>doc.data())
              var Exchanger_status=snapshot.doc.map((doc)=>doc.data())
              this.setState({
                  itemName:this.state.itemName,
                  ExchangerName:this.state.ExchangerName,
                  ExchangerContact:this.state.ExchangerContact,
                  ExchangerAddress:this.state.ExchangerAddress,
                  ExchangerId:this.state.ExchangerId,
                  Exchanger_status:this.state.Exchanger_status
              })
            })
      }
            keyExtractor=(item,index)=>index.toString()

            componentDidMount(){
                this.getAllBarters()
}

render(){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
            onPress={()=>
            this.getAllBarters(),
            this.sendItem()
            }>
              <Text style={styles.text}>Exchange</Text>
            </TouchableOpacity>    
            <FlatList
            keyExtractor={this.keyExtractor}
            />
        </View>    
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        width:200,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        backgroundColor:"orange"
    },
    text:{
        fontSize:25,
        fontWeight:"bold"
    }
})