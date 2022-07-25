import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import PostModel,{Post} from "../model/post_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from './component/custom_image_picker'
import { UserCredentials } from "../model/user_model";

const Add_Post: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [id,setId] = useState<String>("")
    const [name,setName] = useState<String>("")
    const [text,setText] = useState<String>("")
    const [imageUri,setImageUri] = useState<String>("")
    const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});
    React.useEffect(()=>{
    const usrc:UserCredentials = {
      _id:route.params._id,
      access_token:route.params.accessToken,
      refresh_token:route.params.refreshToken
    }
    console.log(usrc);
    setUserInfo(usrc)
  },[route.params?._id])


    const onSave = async ()=>{
      setIsLoading(true)
    
      if(id!="" && name !=""){
        const p:Post = {
          id:id,
          text:text,
          imageUrl:'',
        }
        if(imageUri != ""){
          console.log("saving image")
          const url = await PostModel.uploadImage(imageUri,userInfo)
          p.imageUrl = url
          console.log("saving image : " + url) 
      }
      console.log("Token on save "+userInfo.access_token);
      
        await PostModel.addPost(p,userInfo)
        setIsLoading(false)
        navigation.goBack()
      }
    }
    const onImageSelected = (uri:String)=>{
      console.log("onImageSelected " + uri)
      setImageUri(uri)
  }
    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.image} >
              <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
          </View>
          <TextInput style={styles.textInput}
              onChangeText={setId}
              placeholder="ID"
              keyboardType="default"></TextInput>
          <TextInput style={styles.textInput}
              onChangeText={setName}
              placeholder="Name"
              keyboardType="default"></TextInput>
          <TouchableHighlight
              onPress={onSave}
              underlayColor={COLORS.clickBackground}
              style={styles.button}>
              <Text style={styles.button_text}>Save</Text>
          </TouchableHighlight>
          <View style={styles.activity_indicator}>
              <ActivityIndicator visible={isLoading}></ActivityIndicator>
          </View>
      </View>
  </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "contain",
        padding: 10,
        marginBottom: 10
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey'
    },
    button: {
        margin: 12,
        backgroundColor: 'grey',
        borderRadius: 5
    },
    button_text: {
        fontSize: 30,
        color: 'white',
        textAlign: "center",
        marginTop: 3,
        marginBottom: 3,
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})

  export default Add_Post