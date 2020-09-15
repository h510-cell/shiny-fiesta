import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../Config'
export default class HomeScreen extends React.Component{
  constructor(){
    super(
      this.state={
       itemName:"",
       itemDescription:"",
      }
    )
  }
    getRequest=()=>{
      this.requestRef=db.collection("addItem").get()
      .onsnapShot((snapshot)=>{
       var itemName= snapshot.docs.map((doc)=>doc.data())
       var itemDescription= snapshot.docs.map((doc)=>doc.data())       
       this.setState({
         itemName:itemName,
         itemDescription:itemDescription 
       })
      })
    }
    keyExtractor=(item,index)=>index.toString()

    componentDidMount(){
      this.getRequest()
    }
   
    render(){
        return(
          <View>
            <FlatList
           keyExtractor={this.keyExtractor}
            />
          </View>      
        )
    }
}