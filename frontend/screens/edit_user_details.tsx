import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import UserModel,{User} from "../model/user_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";

const Edit_User: FC<{ navigation: any; route:any }> = ({navigation, route}) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [UserName,setUserName] = useState<String>("")
    const [UserNameOld,setUserNameOld] = useState<String>("")
    const [Password,setPassword] = useState<String>("")
    const [imageUri,setImageUri] = useState<String>("")
    const [accessToken,setAccessToken] = useState<String>("")
    const [refreshToken,setRefreshToken] = useState<String>("")

    React.useEffect(()=>{
      if(route.params?.email){
        setUserName(route.params.email)
        setUserNameOld(route.params.email)
        setPassword(route.params.password)
        setImageUri(route.params.imageUrl)
        setAccessToken(route.params.accessToken)
        setRefreshToken(route.params.refreshToken)
      }
    },route.params?.email)
    const onSave = async ()=>{
      setIsLoading(true)
      if(UserName!="" && Password !="" ){
        const user:User = {
          email:UserName,
          password:Password,
          imageUri: ''
        }
        if(imageUri != ""){
          console.log("saving image")
          const url = await UserModel.uploadImage(imageUri,accessToken)
          user.imageUri = url
          console.log("saving image : " + url) 
      }
      
        await UserModel.updateUser(user,UserNameOld)
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
      <TextInput style={styles.textInput} onChangeText={setUserName} placeholder={UserName.toString()} keyboardType="default"></TextInput>
      <TextInput style={styles.textInput} onChangeText={setPassword} placeholder={Password.toString()} keyboardType="default"></TextInput>

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

  export default Edit_User