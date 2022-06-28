import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import StudentModel,{Student} from "../model/student_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";

const Add_Student: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [id,setId] = useState<String>("")
    const [name,setName] = useState<String>("")
    const onSave = async ()=>{
      setIsLoading(true)
      if(id!="" && name !=""){
        const std:Student = {
          id:id,
          name:name
        }
        await StudentModel.addStudent(std)
        setIsLoading(false)
        navigation.goBack()
      }
    }
    return (
      <ScrollView>
      <View style={styles.container}>
       <Image style={styles.image} source={require("../assets/avatar.jpeg")}></Image>
       <TextInput style={styles.textInput} onChangeText={setId} placeholder="ID" keyboardType="default"></TextInput>
       <TextInput style={styles.textInput} onChangeText={setName} placeholder="Name" keyboardType="default"></TextInput>
       <TouchableHighlight
        underlayColor={COLORS.clickBackground} 
        onPress={()=>{ 
          onSave()
        }} 
        style={styles.button}>
         <Text style={styles.buttonText}>Save</Text>
       </TouchableHighlight>
       <View style={styles.activity_indicator}>
        <ActivityIndicator visible ={isLoading}></ActivityIndicator> 
       </View>
      </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
      container:{
        flex:1
      },
      image:{
        width:"100%",
        height:250,
        resizeMode:"contain",
      },
      textInput:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        borderColor:"grey",
      },
      button:{
        margin:12,
        backgroundColor:"grey",
        borderRadius:50
      },
      buttonText:{
        fontSize:40,
        color:"white",
        textAlign: "center",
        marginTop:3,
        marginBottom:3
      },
      activity_indicator:{
        position:"absolute",
    justifyContent:"center",
    width:"100%",
    height:"100%",
    alignItems:"center"
      }
  })

  export default Add_Student