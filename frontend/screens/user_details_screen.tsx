import React, { FC, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditUserDetailsScreen from "../screens/edit_user_details"
import {User} from "../model/user_model"

//const UserDetailsStack = createNativeStackNavigator();


const UserDetails: FC<{ navigation: any; route: any ,user:User}> = ({
    navigation,
    route,
    user
  }) => {
    const [userMail ,setUserMail] = useState<String>("")
    const [userPassword ,setUserPassword] = useState<String>("")
    const [userImgUri ,setUserImgUri] = useState<String>("")

    React.useEffect(()=>{
      if(route.params?.user){
        setUserMail(route.params.user.email)
        setUserPassword(route.params.user.password)
        setUserImgUri(route.params.user.imageUrl)
      }
  })
    


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
        <TouchableHighlight onPress={()=>navigation.navigate("Edit User Details",{user:user})}>
          <Text>edit</Text>
        </TouchableHighlight>


      </View>
    );
  };

  export default UserDetails