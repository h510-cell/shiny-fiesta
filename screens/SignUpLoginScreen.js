import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert,Modal } from 'react-native';
import firebase from 'firebase';
import Input from 'react-native-elements';
import RFValue from 'react-native-responsive-fontsize';

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super(
            this.state={
            email :'',
            password :''
            }
        )
    }
 userLogin=(()=>{
     if(password){
         Alert.alert("User Login Succesful")
         this.setState({
             email:"",
             password:""
         })
     }
    }
 )

render(){
return(
    <Modal>
    <KeyboardAvoidingView style={{alignItems:'center',marginTop:RFValue(20)}}>
    <View>
    <Input
     style={styles.loginBox}
     placeholder="username"
     keyboardType='email-address'
     onChangeText={(text)=>{
         this.setState({
             email:text
         })
     }}
    />
    <Input
    style={styles.loginBox}
    secureTextEntry={true}
    placeholder="password"
    onChangeText={(text)=>{
        this.setState({
            password:text
        })
    }}
    />
    </View>
    <View>
    <TouchableOpacity style={{height:RFValue(30),width:RFValue(90),borderWidth:1,margin:RFValue(20),paddingTop:RFValue(5),borderRadius:7}}>
        <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{height:RFValue(30),width:RFValue(90),borderWidth:1,margin:RFValue(50),paddingTop:RFValue(5),borderRadius:7}}>
        <Text>Sign Up</Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </Modal>
)
}
}

const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        broderWidth:1.5,
        margin:10,
        paddingLeft:10
    },
})
