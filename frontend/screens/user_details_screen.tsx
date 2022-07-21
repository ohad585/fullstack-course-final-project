import React, { FC, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditDetailsScreen from "../screens/edit_user_details"

/* const DetailsStack = createNativeStackNavigator();

const DetailsStackScreen: FC<{ navigation: any}> = ({ navigation}) => {
  const openEditDetails = ()=>{
      navigation.navigate("edit user details")
  }
/*   return (
    <DetailsStack.Navigator>  
      <DetailsStack.Screen name="edit user details" component={EditDetailsScreen} />
    </DetailsStack.Navigator>
  ); 
}; */

const UserDetails: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [userID ,setUserID] = useState<String>("")
    const [userMail ,setUserMail] = useState<String>("")
    const [userPassword ,setUserPassword] = useState<String>("")
    const [userImgUri ,setUserImgUri] = useState<String>("")

    React.useEffect(()=>{
        if(route.params?.id){
            setUserID(route.params.id)
        }
    })

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>user mail: {userMail}</Text>
        <Text>user Password: {userPassword}</Text>
        <Text>user Img: {userImgUri}</Text>
        <TouchableHighlight onPress={()=>console.log("edit btn")}>edit</TouchableHighlight>


      </View>
    );
  };

  export default UserDetails