import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight ,Button} from "react-native"

import COLORS from "../constants/colors"
import postModel,{Post} from "../model/post_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditPostScreen from "../screens/edit_post_screen"

const UserPostsStack = createNativeStackNavigator();
const removePost =  (postID:String) =>{
    //to do: function in post model
}

const UserPostListRow: FC<{ post: Post, navigation: any}> = ({ post  ,navigation}) => {
    return (
        <TouchableHighlight>
            <View style={styles.list_row_container}>
                { post.imageUrl != "" &&  <Image source={{uri: post.imageUrl.toString()}} style={styles.list_row_image}></Image>}
                { post.imageUrl == "" &&  <Image source={require("../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
                <View style={styles.list_row_text_container}>
                    <Text style={styles.list_row_id}>{post.id}</Text>
                    <Text style={styles.list_row_name}>{post.text}</Text>
                    <TouchableHighlight onPress={()=>navigation.navigate("Edit Post Screen")}>Edit Post</TouchableHighlight>
                    <TouchableHighlight onPress={()=>removePost(post.id)}>Remove Post</TouchableHighlight>

                </View>
            </View>
        </TouchableHighlight>
    )
}


const UserPosts: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [data, setData] = useState<Array<Post>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(()=>{
        navigation.addListener('focus',()=>{
            //found how is login
            var userID="123"
            reloadData(userID)
        })
    },[navigation])

    const reloadData = async (userID:String)=>{
        setIsLoading(true)
        const postData = await postModel.getUserPosts(userID)
        setData(postData)
        setIsLoading(false)
    }

    return (
        
        <View style={styles.home_container}>
            <NavigationContainer>
            <UserPostsStack.Navigator screenOptions={{ title: 'Apply to all' }}>
            <UserPostsStack.Screen name="Edit Post Screen" component={EditPostScreen} />
            </UserPostsStack.Navigator>
            </NavigationContainer>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (<UserPostListRow post={item} navigation={navigation} />)}
            ></FlatList>
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    home_container: {
        flex: 1
    },
    list_row_container: {
        height: 150,
        flexDirection: "row",
        elevation: 4,
        borderRadius: 3,
        marginLeft: 8,
        marginRight: 8
    },
    list_row_image: {
        height: 130,
        width: 130,
        margin: 10,
        borderRadius: 15
    },
    list_row_text_container: {
        justifyContent: "center"
    },
    list_row_name: {
        fontSize: 30,
        marginBottom: 10
    },
    list_row_id: {
        fontSize: 25
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})
export default UserPosts