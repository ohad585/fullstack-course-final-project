import React, { FC, useReducer, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditUserDetailsScreen from "../screens/edit_user_details"
import UserModel, {User} from "../model/user_model"
import { UserCredentials } from "../model/user_model";


const UserDetails: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [userMail ,setUserMail] = useState<String>("")
    const [userPassword ,setUserPassword] = useState<String>("")
    const [userImgUri ,setUserImgUri] = useState<String>("")
    const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});

    const getUser =async (id:String) => {
      const user =  await UserModel.getUserById(route.params._id) 
      setUserMail(user.email)
      setUserPassword(user.password)
      setUserImgUri(user.imageUri)
     }

    React.useEffect(()=>{
      const usrc:UserCredentials = {
        _id:route.params._id,
        access_token:route.params.accessToken,
        refresh_token:route.params.refreshToken
      }
      console.log(usrc);
      setUserInfo(usrc)
      getUser(usrc._id)
    },[route.params?._id])
    


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       
        <Text>user mail: {userInfo._id}</Text>
        <Text>user Password: {userPassword}</Text>
        <Text>user Img: {userImgUri}</Text>
        <TouchableHighlight onPress={()=>navigation.navigate("Edit User Details",{user:userInfo})}>
          <Text>Edit My Details</Text>
          </TouchableHighlight>
        <TouchableHighlight onPress={()=>navigation.navigate("User Posts",{user:userInfo})}>
        <Text>My Posts</Text>          
        </TouchableHighlight>
      </View>
    );
  };

  export default UserDetails