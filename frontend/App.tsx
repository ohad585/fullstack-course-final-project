import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Button ,Image, TouchableHighlight} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/home_screen"
import AboutScreen from "./screens/about_screen"
//import DetailsScreen from "./screens/details_screen"
//import AddStudentScreen from "./screens/add_student_screen";
import LoginScreen from "./screens/login_screen"
import RegistrationScreen from "./screens/registration_screen"
import COLORS from "./constants/colors";
import AddPostScreen from "./screens/add_post_screen"
import LandingScreen from "./screens/landing_screen";


const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

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
      <HomeStack.Screen name="Landing" component={LandingScreen} options={{
        headerShown:false
      }}/>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerRight: ()=>{return (<TopBarAddButton onClick={openAddPost}></TopBarAddButton>)},
          }} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegistrationScreen} />
      <HomeStack.Screen name="Add Post" component={AddPostScreen} />
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
        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown :false,title:"Home"}}></Tab.Screen>
        <Tab.Screen name="About" component={AboutScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({

})


export default App;
