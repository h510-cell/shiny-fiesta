import React from 'react';
import { StyleSheet, 
    Text,
    View,
    Modal,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView
         } from 'react-native';
import firebase from 'firebase';
import db from '../Config'
import MyHeader from '../components/MyHeader'
import RFValue from 'react-native-responsive-fontsize';

export default class ExchangeScreen extends React.Component{
    constructor(){
        super(
            this.state={
                userName : firebase.auth().currentUser.email,
                firstname:"",
                lastname:"",
                itemName:"",
                itemDescription:"",
                requestedItemName:"",
                reasonToRequest:"",
                itemStatus:"",
                exchangeId:'',
                IsExchangeRequestActive:false,
                itemValue:"",
                currencyCode:""
            }
        )
    }

  

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addItem=async(itemName,itemDescription)=>{
       var userName = this.state.userName
       var exchangeId = this.createUniqueId()
       console.log("im called",exchangeId);
       db.collection("exchange_request").add({
           "userName": userName,
           "item_name":itemName,
           "itemDescription":itemDescription,
           "exchangeId":exchangeId,
           "item_status":"recived",
           "item_value":this.state.itemValue,
             date : firebase.firestore.FieldValue.serverTimestamp()
       })
       await this.getExchangeRequest()
       db.collection('users').where("userName","==",userName).get()
       .then()
       .then((snapshot)=>{
           snapshot.forEach((doc)=>{
               db.collection('users').doc(doc.id).update({
                   IsExchangeRequestActive:tr
               })
           })
       })

       this.setState({
           itemName:"",
            itemDescription:"",
            itemValue:""
       })

        // NOTE: Comment below return statement when you test the app in ios
     // ToastAndroid.showWithGravityAndOffset('Item ready to exchange',
     //    ToastAndroid.SHORT,
     //  );
     // return this.props.navigation.navigate('HomeScreen')

     // NOTE:  Comment the below return statement when you test the app in android
     return Alert.alert(
        'Item ready to exchange',
        '',
        [
          {text: 'OK', onPress: () => {

            this.props.navigation.navigate('HomeScreen')
          }}
        ]
    );
    }
    getIsExchangeRequestActive(){
        db.collection('users')
        .where('userName','==',this.state.userName)
        .onSnapshot(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            this.setState({
                IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
                userdDocId : doc.id,
                currencyCode:doc.data().currency_code
            })
          }) 
        })
        }

        getExchangeRequest =()=>{
            // getting the requested item
          var exchangeRequest=  db.collection('exchange_requests')
            .where('username','==',this.state.userName)
            .get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                if(doc.data().item_status !== "received"){
                  this.setState({
                    exchangeId : doc.data().exchangeId,
                    requestedItemName: doc.data().item_name,
                    itemStatus:doc.data().item_status,
                    itemValue : doc.data().item_value,
                    docId     : doc.id
                  })
                }
              })
          })
        }

        getValue=()=>{
            fetch("http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1")
            .then(response=>{
                return response.json();  
            }).then(responseData=>{
                var currencyCode = this.state.currencyCode;
                var currency = responseData.rates.INR;
                var value = 69/currency;
                console.log(value)
            })
        }

        componentDidMount(){
            this.getExchangeRequest(),
            this.getIsExchangeRequestActive(),
            this.getValue()
        }

        receivedItem=(itemName)=>{
            var userId = this.state.userName
            var exchangeId = this.state.exchangeId
            db.collection('received_items').add({
                "user_id": userId,
                "item_name":itemName,
                "exchange_id"  : exchangeId,
                "itemStatus"  : "received",
        
            })
          }
        
          updateExchangeRequestStatus=()=>{
            //updating the book status after receiving the book
            db.collection('requested_requests').doc(this.state.docId)
            .update({
              item_status : 'recieved'
            })
        
            //getting the  doc id to update the users doc
            db.collection('users').where('username','==',this.state.userName).get()
            .then((snapshot)=>{
              snapshot.forEach((doc) => {
                //updating the doc
                db.collection('users').doc(doc.id).update({
                  IsExchangeRequestActive: false
                })
              })
            })
        
        }

        sendNotification=()=>{
          //to get the first name and the last name
          db.collection('users').where('emailId','==',this.state.userId).get()
          .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                  var firstname = doc.data().firstname;
                  var lastname = doc.data().lastname;

                  //To get ExchangerId and Item Name
                  db.collection('all_notification').where('exchangeId','==',this.state.exchangeId).get()
                  .then((snapshot)=>{
                      snapshot.forEach((doc)=>{
                        var donor_id = doc.data().donor_id;
                        var itemName = doc.data().itemName;
                      })

                      //take userId Is the donor_idto send notification to the user
                      db.collection('all_notification').add({
                          "take_userId":donor_id,
                          "message":firstname + "" + lastname + "recieved the item" + itemName,
                          "notification_status" : "unread",
                          "itemName" : itemName
                      });
                  });
              });
          });
        };


    render(){
        if(this.state.IsExchangeRequestActive===true){
    return(
        //Exchange Screen Status
        <View style={{flex:1,justifyContent:"center"}}>
          <View style={{backgroundColor:'orange',borderWidth:2,justifyContent:"center",alignItems:"center",padding:RFValue(10)}}>
              <Text>Item Name</Text>    
              <Text>{this.state.requestedItemName}</Text>
          </View>      
          <View style={{backgroundColor:'orange',borderWidth:2,justifyContent:"center",alignItems:"center",padding:RFValue(10)}}>
              <Text>Item Status</Text>
              <Text>{this.state.itemStatus}</Text>
          </View>  
          <View style={{backgroundColor:'orange',borderWidth:2,justifyContent:"center",alignItems:"center",padding:RFValue(10)}}>
              <Text>Item Value</Text>
              <Text>{this.state.itemValue}</Text>
          </View>    
            <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:'orange',width:RFValue(300),alignSelf:"center",
            height:RFValue(100)}}
            onPress={()=>{
                db.collection('users').update({
                    IsExchangeRequestActive:this.state.IsExchangeRequestActive
                })
                this.sendNotification(),
                this.updateExchangeRequestStatus(),
                this.receivedItem(this.state.requestedItemName)
            }}
            >
               <Text style={styles.text}>I recieved the item</Text>
          </TouchableOpacity>    
        </View>
    )
        }
        else{
            return(
                //Form Screen
                <View style={{flex:1}}>
                <MyHeader title="Request Item" navigation={this.props.navigation}/>
                <ScrollView>
                    <KeyboardAvoidingView style={styles.KeyBoardStyle}>
                        <TextInput
                        style={styles.TextInput}
                        placeholder={"Enter Item Name"}
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({
                                itemName:text
                            })
                        }}
                        />
                        <TextInput
                         style={styles.TextInput}
                         multiline
                         numberOfLines={8}
                         placeholder={"Why Do You Need The Item"}
                         onChangeText={(text)=>{
                             this.setState({
                                 reasonToRequest:text
                             })
                         }}
                        />
                    </KeyboardAvoidingView>    
                </ScrollView>    
                </View>    
            )
        }
    }
render(){
    return(
        <Modal>
        <KeyboardAvoidingView>
        <View>
          <TextInput
           style={styles.TextInput}
          placeholder={"itemName"}
          maxLength={8}
          onChangeText={(text)=>{
              this.setState({
                  itemName:text
              })
          }}
          value={this.state.itemName}
          />
          <TextInput
           style={styles.TextInput}
          placeholder={"itemDescription"}
          maxLength={8}
          onChangeText={(text)=>{
              this.setState({
                  itemDescription:text
              })
          }}
          value={this.state.itemDescription}
          />
          <TextInput
          style={styles.TextInput}
          placeholder={"itemValue"}
          maxLength={8}
          onChangeText={(text)=>{
              this.setState({
                  itemValue:text
              })
          }}
          value={this.state.itemValue}
          />
        </View>  
        <View>
         <TouchableOpacity style={styles.AddItembutton}
         onPress={()=>{this.addItem(this.state.itemName,this.state.itemDescription)}}>
           <Text>AddItem</Text>
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
        alignSelf:"center",
        borderColor:'#fffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    AddItembutton:{
        width:300,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgb(0,0,225)"
    }
})