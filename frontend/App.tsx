import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Button ,Image, TouchableHighlight} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "./constants/colors";

import HomeScreen from "./screens/home_screen"
import LoginScreen from "./screens/login_screen"
import RegistrationScreen from "./screens/registration_screen"
import AddPostScreen from "./screens/add_post_screen"
import UserDetailsScreen from "./screens/user_details_screen"
import UserPostsScreen from "./screens/user_posts_screen"
import PostDetailsScreen from "./screens/post_screen"
import EditUserDetailsScreen from "./screens/edit_user_details"
import EditPostScreen from "./screens/edit_post_screen"




const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();


//component of add post btn
const TopBarAddButton: FC<{onClick:()=>void}> = ({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}} underlayColor ={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={"grey"} />
        </TouchableHighlight>
    )
}

const HomeStackScreen: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
    const openAddPost = ()=>{
        navigation.navigate("Add Post")
    }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} 
      options={{headerRight: ()=>{return (<TopBarAddButton onClick={openAddPost}></TopBarAddButton>)}}} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegistrationScreen} />
      <HomeStack.Screen name="Add Post" component={AddPostScreen} />
      <HomeStack.Screen name="User Details" component={UserDetailsScreen} />
      <HomeStack.Screen name="User Posts" component={UserPostsScreen} />
      <HomeStack.Screen name="Post Details" component={PostDetailsScreen} />
      <HomeStack.Screen name="Edit User Details" component={EditUserDetailsScreen} />
      <HomeStack.Screen name="Edit Post Screen" component={EditPostScreen} />

      

    </HomeStack.Navigator>
  );
};

const App: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "About") {
              iconName = focused? "information-circle": "information-circle-outline";
            } 
            else if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home-outline";
            }
            else if (route.name === "Login") {
              iconName = focused ? "log-in-outline" : "log-in-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown :false}}></Tab.Screen>
        <Tab.Screen name="Login" component={LoginScreen}></Tab.Screen>
        <Tab.Screen name="Register" component={RegistrationScreen}></Tab.Screen>
        <Tab.Screen name="UserDetails" component={UserDetailsScreen}></Tab.Screen>
        <Tab.Screen name="UserPosts" component={UserPostsScreen}></Tab.Screen>



      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({

})


export default App;
