import React, { FC, useReducer, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditUserDetailsScreen from "../screens/edit_user_details"
import {User} from "../model/user_model"
import { UserCredentials } from "../model/user_model";
//const UserDetailsStack = createNativeStackNavigator();


const UserDetails: FC<{ navigation: any; route: any ,user:User}> = ({
    navigation,
    route,
    user
  }) => {
    const [userMail ,setUserMail] = useState<String>("")
    const [userPassword ,setUserPassword] = useState<String>("")
    const [userImgUri ,setUserImgUri] = useState<String>("")
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
    


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       {/*  <NavigationContainer>
            <UserDetailsStack.Navigator screenOptions={{ title: 'Apply to all' }}>
            <UserDetailsStack.Screen name="Edit User Screen" component={EditUserDetailsScreen} />
            </UserDetailsStack.Navigator>
            </NavigationContainer> */}
        <Text>user mail: {userInfo._id}</Text>
        <Text>user Password: {userPassword}</Text>
        <Text>user Img: {userImgUri}</Text>
        <TouchableHighlight onPress={()=>navigation.navigate("Edit User Details",{user:user})}>
          <Text>edit</Text>
        </TouchableHighlight>
      </View>
    );
  };

  export default UserDetails