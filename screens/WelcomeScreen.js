import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert,Modal } from 'react-native';
import firebase from 'firebase';
import db from '../Config'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super(
            this.state={
            email :'',
            password :'',
            firstname:'',
            lastname:'',
            phoneNumber:'',
            address:'',
            password:'',
            ConfirmPassword:'',
            IsExchangeRequestActive:""
            }
        )
    }


  userSignUp=(email,password,ConfirmPassword)=>{
      if(password!=ConfirmPassword){
          return Alert.alert('password does not exit/ncheck your password')
      }else{
          firebase.auth().CreateUserWithEmailAndPassword(email,password)
          .then(()=>{
              db.collection('users').add({
                  FirstName:this.state.FirstName,
                  LastName:this.state.LastName,
                  PhoneNumber:this.state.PhoneNumber,
                  email:this.state.email,
                  Address:this.state.Address,
                  IsExchangeRequestActive:this.state.IsExchangeRequestActive
              })
              return Alert.alert(
                  ('Users Successfully Added')
              );
          })
          .catch((error)=>{
              //Handle Error here.
              var errorCode=error.code;
              var errorMessage=error.message;
              return Alert.alert(errorMessage) 
          })
      }
}

 showModal=()=>{
     return(
     <Modal>
      <KeyboardAvoidingView>
        <Input
        style={styles.TextInput}
        placeholder={"FirstName"}
        maxLength={8}
        onChangeText={(text)=>{
            this.setState({
              firstname:text
            })
        }}
        /> 
     <Input
     style={styles.TextInput}
      placeholder={"LastName"}
      maxLength={8}
      onChangeText={(text)=>{
          this.setState({
            lastname:text  
          })
      }}
     /> 
     <Input
     style={styles.TextInput}
     placeholder={"PhoneNumber"}
     maxLength={10}
     keyboardType={"numeric"}
     onChangeText={(text)=>{
         this.setState({
             phoneNumber:text
         })
     }}
     />
     <Input
     style={styles.TextInput}
     placeholder={"Address"}
     multiline={true}
     onChangeText={(text)=>{
         this.setState({
             address:text
         })
     }}
     />
     <Input
     style={styles.TextInput}
     placeholder={"Email"}
     keyboardType={'email-address'}
     onChangeText={(text)=>{
         this.setState({
             email:text
         })
     }}
     />
     <Input
     style={styles.TextInput}
     placeholder={"Password"}
     secureTextEntry={true}
     onChangeText={(text)=>{
         this.setState({
             password:text
         })
     }}
     />
     <Input
     style={styles.TextInput}
     placeholder={"ConfirmPassword"}
     secureTextEntry={true}
     onChangeText={(text)=>{
         this.setState({
             ConfirmPassword:text
         })
     }}
     />
     <View>
     <TouchableOpacity style={styles.registerButton}
       onPress={()=>
        this.userSignUp(this.state.email,this.state.password,this.state.ConfirmPassword)
        }
        >    
       <Text style={styles.buttonText}>Register</Text>
     </TouchableOpacity> 
     <TouchableOpacity style={styles.cancleButton}>
      <Text style={{color:'#ff5722'}}>Cancle</Text>
     </TouchableOpacity>       
     </View>   
      </KeyboardAvoidingView>       
     </Modal>
     )    
 }
}



const styles = StyleSheet.create({
    TextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
    },
    registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30 
    },
    cancleButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5
    },
    buttonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
    }
})