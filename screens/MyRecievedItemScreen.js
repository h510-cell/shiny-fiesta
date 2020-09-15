import React,{Component} from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import db from '../Config';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';


export default class MyRecievedItemScreen extends Component{
    constructor(){
        super()
        this.state={
            userId : firebase.auth().currentUser.email,
            recievedItemList:""
        }
        this.requestRef=null;
    }

    getRecievedItemList=()=>{
        this.requestRef=db.collection('request_item')
        .where('user_id','==',this.state.userId)
        .where("itme_status",'==','recieved')
        .onSnapshot((snapshot)=>{
            var recievedItemList = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                recievedItemList : recievedItemList
            })
        })
    }
    componentDidMount(){
        this.getRecievedItemList()
    }
    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=>index.toString();

    renderItem = ({item,i})=>{
     console.log(item.itemName);
     return(
         <ListItem
         key={i}
         title={item.itemName}
         subtitle={item.itemStatus}
         titleStyle={{color:"black",fontWeight:"bold"}}
         bottomDivider
         />
     )
    }

    render(){
        return(
           <View style={{flex:1}}>
               <MyHeader title="Recieved Item" navigation={this.props.navigation}/>
           <View style={{flex:1}}>
               {
                   this.state.recievedItemList.length === 0
                   ?(
                       <View style={styles.container}>
                           <Text>List Of Recieved List</Text>
                       </View>    
                   )
                   :(
                       <FlatList
                       keyExtractor={this.keyExtractor}
                       data={this.state.recievedItemList}
                       renderItem={this.renderItem}                       
                       />
                   )
}  
           </View>
           </View>   
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alignSelf:"center"
    }
})