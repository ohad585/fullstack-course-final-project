import React, { FC, useReducer, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import UserModel from "../model/user_model";
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

    const getUser =async (id:String) => {

      const user =  await UserModel.getUserById(route.params._id)   
      console.log("getUser "+user.email);
      setUserImgUri(user.imageUri)
      setUserMail(user.email)
      setUserPassword(user.password)
     }

    React.useEffect(()=>{
      const usrc:UserCredentials = {
        _id:route.params._id,
        access_token:route.params.accessToken,
        refresh_token:route.params.refreshToken
      }
      console.log(usrc);
      setUserInfo(usrc)
      getUser(route.params._id)
    },[route.params?._id])
    
    const navigateToEditDetails = ()=>{
      navigation.navigate("Edit User Details",{
        email:userMail,
        password:userPassword,
        imgUri:userImgUri,
        accessToken:route.params.accessToken,
        refreshToken:route.params.refreshToken
      })
    }


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       {/*  <NavigationContainer>
            <UserDetailsStack.Navigator screenOptions={{ title: 'Apply to all' }}>
            <UserDetailsStack.Screen name="Edit User Screen" component={EditUserDetailsScreen} />
            </UserDetailsStack.Navigator>
            </NavigationContainer> */}
        <Text>user mail: {userMail}</Text>
        <Text>user Password: {userPassword}</Text>
        <Text>user Img: {userImgUri}</Text>
        <TouchableHighlight onPress={()=>navigateToEditDetails()}>
          <Text>edit</Text>
        </TouchableHighlight>
      </View>
    );
  };

  export default UserDetails