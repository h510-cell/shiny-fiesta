import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import RFValue from 'react-native-responsive-fontsize';

export default class CustomSideBarMenu extends React.Component{

  constructor(){
    super()
    this.state={
      userId : firebase.auth().currentUser.email,
      image:"#",
      name:"",
      docId:""
    }
  }

   selectPicture=async()=>{
     //using ImagePicker to select image from phone gallery
     const {cancelled,url} = await ImagePicker.LaunchImageLibraryAsync({
       mediaType : ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect : [4,3],
       quality:1 
     });

     if(!cancelled){
       this.uploadImage(url,this.state.userId)
     };

     uploadImage=async(url,imageName)=>{
       //to upload image from the cloud storage
       var response = await fetch(url)
       var bolb = await response.blob();

       var ref = firebase
       .storage()
       .ref()
       .child("user_profiles"+imageName);

       return this.ref.put(blob).then((response)=>{
         this.fetchImage(imageName);
       }) ;
     };

      fetchImage=(imageName)=>{
     //to get image from cloud storage
     var storageRef = firebase
     .storage()
     .ref()
     .child("user_profiles"+imageName)

     //get the downland URL

       .getDownloadURL()
       .then((url)=>{
         this.setState({image:url})
       })
       .catch((error)=>{
        this.setState({image:"#"})
       });
      };
   }

   getUserProfile(){
     db.collection('users')
     .where('emailId','==',this.state.userId)
     .onSnapshot((querySnapshot)=>{
       querySnapshot.forEach((doc)=>{
         this.setState({
           name: doc.data().firstname+""+doc.data().lastname
         });
       });
     });
   };

    render(){
      return(     
        <KeyboardAvoidingView>    
      <Avatar
         rounded
         source={{
           uri:this.state.image
         }}
         size="medium"
         onPress={()=>this.selectPicture()}
         containerStyle={styles.imageContainer}
         showEditButton
         />
         <Text style={{fontWeight:"100",fontSize:RFValue(20),paddingTop:RFValue(10)}}>
          {this.state.name}
        </Text>   
          <View style={{flex:1}}>
            <View style={styles.container}>
                <DrawerItems  {...this.props}/>
              </View>    
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logutButton}
            onPress={() =>{
            this.props.navigation.navigate('WelcomeScreen')
            firebase.auth().signOut();
            }}>  
            <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>  
          </View>  
          </View>
          </KeyboardAvoidingView>
      )
    }
}

const styles = StyleSheet.create({
  container:{
    flex:0.8
  },
  logoutContainer:{
    flex:0.8,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logutButton:{
    height:40,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  text:{
    fontSize:'32',
    fontWeight:'bold'
  },
  imageContainer:{
    flex:0.75,
    width:"40%",
    height:"20%",
    marginLeft:20,
    marginTop:30,
    paddingTop:10
  }
})