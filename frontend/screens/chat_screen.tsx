import React, { FC, useState,useEffect } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView,FlatList,SafeAreaView } from "react-native";
import COLORS from "../constants/colors";
import {io} from "socket.io-client"
import LocalCache from "../model/local_cache";
import ImsModel, { Message } from "../model/ims_model";

const socket = io('http://192.168.0.100:3000')
var userEmail = ''


const SentMessage: FC<{payload:Message}> = ({ payload }) => {
  let View
  if(payload.sender==userEmail){
    View = <Text style={styles.my_message}>{payload.text}</Text>
  }else View = <Text style={styles.sent_message}>{payload.text}</Text>
    return View;
  };



/*   const MyMessage: FC<{Message:String}> = ({ Message }) => {
    return (
      <Text style={styles.my_message}>{Message}</Text>
    );
  };
 */

  const TextBox: FC<{}> = ({}) => {

    const sendMessage=(message:String)=>{
      console.log(message);
      setText("")
      socket.emit("ims:send_message",{
        to: "all",
        from: userEmail,
        message: message
    })
    }

    const [text,setText] = useState<String>("Send message")
    return (
      <SafeAreaView >

        <View style={styles.row }>
      <TextInput style={styles.TextBox} onChangeText={setText} placeholder={"Send text"} keyboardType="default"></TextInput>
    <TouchableHighlight onPress={()=> sendMessage(text.toString())}>
    <Image  style={styles.img } source={require("../assets/sentIMG.png")} ></Image>
    </TouchableHighlight>
    </View>
    </SafeAreaView >

    );
  };

  const getUserEmail =async () => {
    const email = await LocalCache.getUserEmail()
    console.log("EMAIL "+ email?.toString());

    if(email!=null &&email !=undefined){
      userEmail = email
    }
  }

  

const Chat: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {

  const [data,setData] = useState<Array<Message>>([]);

  const getImsData =async () => {
    const imsData = await ImsModel.getAllMessages()
    setData(imsData)
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getImsData();
      getUserEmail()
    });
  }, [navigation]);
  console.log("Socket starting");
  socket.on("connect_error", (err) => {
    //socket.auth.token = "abcd";
    console.log("connect_error "+err);

    socket.connect();
  });
  socket.on("connect", () => {
    console.log("client connected")
  });
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  
  useEffect(() => {
    socket.on("ims:reciev_message", (data) => {
      console.log("Recived msg from socket "+data.from+" "+data.message);
      const msg:Message = {
        sender:data.to,
        text:data.message
      }
      setData((data) => [...data, msg]);
    });
  }, [socket]);

 
    return (
    <ScrollView>

    <View>

    {/*   <View > 
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       </View >


 */}

        <FlatList
        data={data}
        keyExtractor={(item) => item.text.toString()}
        renderItem={({ item }) => (
          <SentMessage payload={item} />
        )}
        
      ></FlatList> 
     
        <TextBox ></TextBox>
    </View>
    </ScrollView>

    )
    
}


const styles = StyleSheet.create({

    sent_message: {
      alignSelf: 'flex-end',
      borderWidth:3, 
       borderRadius: 10,
       width: 'auto',
      backgroundColor : "lightgrey",
      fontSize: 30,
      padding: 20,
      margin:15,
     

    },
    my_message: {
      alignSelf: 'flex-start',
      borderWidth: 3, 
       borderRadius: 10,
       width: 'auto',
       backgroundColor : "powderblue",
        fontSize: 30,
        padding: 20,
        margin:15,


    },
    TextBox:{
      fontSize: 20,
      margin:15,
        borderWidth:3,
        borderColor:"grey",
        color: 'black',
        height: 80,
        width:" 60%" ,


      },
      img:{
        alignSelf: 'flex-end',  
        margin:15,
        height: 80,
        width:100 ,
      },
      row: {
        position: "absolute", 
        bottom:0,
        flexDirection: "row",
        //flexWrap: "wrap",

    
      },
});
export default Chat