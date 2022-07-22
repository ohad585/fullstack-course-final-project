import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import PostModel,{Post} from "../model/post_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";

const Edit_Post: FC<{ navigation: any; route: any, post:Post}> = ({navigation,route,post }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [ID,setID] = useState<String>(post.id)
    const [text,setText] = useState<String>("")
    const [imageUrl,setImageUrl] = useState<String>("")


    const onSave = async ()=>{
      setIsLoading(true)
      if(text!="" && imageUrl !="" ){
        const p:Post = {
          id:ID,
          text:text,
          imageUrl: ''
        }
        if(imageUrl != ""){
          console.log("saving image")
          const url = await PostModel.uploadImage(imageUrl)
          p.imageUrl = url
          console.log("saving image : " + url) 
      }
      
        await PostModel.updatePost(p)
        setIsLoading(false)
        navigation.goBack()
      }
    }

    const onImageSelected = (uri:String)=>{
      console.log("onImageSelected " + uri)
      setImageUrl(uri)
  }


    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.image} >
      <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
      </View>
      <TextInput style={styles.textInput} onChangeText={setText} placeholder={post.text.toString()} keyboardType="default"></TextInput>
      <TextInput style={styles.textInput} onChangeText={setImageUrl} placeholder={post.imageUrl.toString()} keyboardType="default"></TextInput>



      <TouchableHighlight underlayColor={COLORS.clickBackground} onPress={()=>{onSave()}} style={styles.button}>
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

  export default Edit_Post