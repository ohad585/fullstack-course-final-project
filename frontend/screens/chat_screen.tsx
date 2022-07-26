import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import COLORS from "../constants/colors";


const SentMessage: FC<{Message:String}> = ({ Message }) => {
    return (
      <Text style={styles.sent_message}>{Message}</Text>
    );
  };
  const MyMessage: FC<{Message:String}> = ({ Message }) => {
    return (
      <Text style={styles.my_message}>{Message}</Text>
    );
  };
  const TextBox: FC<{}> = ({}) => {
    const sendMessage=(message:String)=>{
        alert({message})
    }

    const [text,setText] = useState<String>("")
    return (
        <View style={styles.row }>
    <TextInput style={styles.TextBox} onChangeText={setText} placeholder={"Enter Message"} keyboardType="default"></TextInput>
    <TouchableHighlight onPress={()=> sendMessage(text.toString())}>
    <Image  style={styles.img } source={require("../assets/sentIMG.png")} ></Image>
    </TouchableHighlight>
    </View>
    );
  };

const Chat: FC<{ }> = ({ }) => {
    return (
    <View>
        <SentMessage Message={"sent message"}></SentMessage>
        <MyMessage Message={"my message"}></MyMessage>
        <TextBox></TextBox>
    </View>
    )
    
}


const styles = StyleSheet.create({
    sent_message: {
        marginBottom:15,
        marginTop:15,

        textAlign: 'right',
        backgroundColor : "lightgrey",
        fontSize: 30,
        padding: 20,

    },
    my_message: {
        marginTop:15,
        marginBottom:15,
        flexWrap:"wrap",
        textAlign: 'left',
        backgroundColor : "powderblue",
        fontSize: 30,
        padding: 20,

    },
    TextBox:{
        fontSize: 30,
        height:60,
        margin:15,
        borderWidth:3,
        borderColor:"grey",
        color: 'black',
        flex:1
      },
      img:{
        alignSelf: 'flex-end',  
        margin:15,
        height: 60,
        width: 60 
      },
      row: {
        flex: 1,
        flexDirection: "row",
        textAlignVertical: 'bottom',
        
      },
});
export default Chat