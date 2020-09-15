import React from 'react';
import { StyleSheet, Text, View,Alert,TextInput,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../Config'
import Input from 'react-native-elements';

export default class SettingScreen extends React.Component{
    constructor(){
        super();
            this.state={
                emailId:'',
                firstname:'',
                lastname:'',
                address:'',
                phoneNumber:'',
            }
    }

    getData(){
        var email=firebase.Auth().currentUser.email;
        db.collecton('users').where('email_id','==',email).get()
        .then(snapshot=>{
               snapshot.forEach(doc => {
                   var data = doc.data()
                   this.setState({
                      emailId : data.email_id,
                      firstname : data.first_name,
                      lastname : data.last_name,
                      address : data.address,
                      phoneNumber : data.phoneNumber,
                   })
               });
        })    
    }

    updateData(){
        db.collection('users')
        .update()
        this.setState({
            "first_name" : this.state.firstname,
            "last_name" : this.state.lastname,
            "address" : this.state.address,
            "phoneNumber" : this.state.phoneNumber
        })
        Alert.alert("Profile Updated Succesfully");
    }    
    componentDidMount(){
        this.getData();
    }
    render(){
        return(
           <View style={styles.container}>
               <MyHeader title="Setting" navigation={this.props.navigation}/>
               <View>
             <Input
             style={styles.TextInput}
             placeholder={"FirstName"}
             maxLength={8}
             onChangeText={(Text)=>{
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
             placeholde={"Address"}
             multiline={true}
             onChangeText={(text)=>{
                 this.setState({
                     address:text
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
             <TouchableOpacity style={styles.button}
             onPress={()=>{
            this.updateData()
             }}>
              <Text style={styles.text}>Save</Text> 
             </TouchableOpacity>    
             </View>
           </View>     
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    TextInput:{
        width:"75%",
        height:35,
        alignSelf:"center",
        borderColor:'#fffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        width:"75%",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:10,
        marginTop:30,
        color:'ff5722'  
    },
    text:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
    }
})