import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

import PostModel, { Post } from "../model/post_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../constants/colors";
import UserModel,{ UserCredentials } from "../model/user_model";

const PostListRow: FC<{ post: Post; onItemClick: (id: String) => void }> = ({
  post,
  onItemClick,
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        onItemClick(post.id);
      }}
      underlayColor={COLORS.clickBackground}
    >
      <View style={styles.list_row_container}>
        {post.imageUrl != "" && (
          <Image
            source={{ uri: post.imageUrl?.toString() }}
            style={styles.list_row_image}
          ></Image>
        )}
        {post.imageUrl == "" && (
          <Image
            source={require("../assets/avatar.jpeg")}
            style={styles.list_row_image}
          ></Image>
        )}
        <View style={styles.list_row_text_container}>
          <Text style={styles.list_row_id}>{post.id}</Text>
          <Text style={styles.list_row_name}>{post.text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Home: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const TopBarAddButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onClick();
        }}
        underlayColor={COLORS.clickBackground}
      >
        <Ionicons name={"add-outline"} size={40} color={"grey"} />
      </TouchableHighlight>
    );
  };

  const TopBarUserDetailsBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onClick();
        }}
        underlayColor={COLORS.clickBackground}
      >
        <Ionicons name={"person-circle-outline"} size={40} color={"grey"} />
      </TouchableHighlight>
    );
  };










  const [data, setData] = useState<Array<Post>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserCredentials>({
    _id: "",
    access_token: "",
    refresh_token: "",
  });
  const [accessToken, setAccessToken] = useState<String>("");
  const openAddPost = () => {
    navigation.navigate("Add Post", {
      _id: userInfo._id,
      accessToken: userInfo.access_token,
      refreshToken: userInfo.refresh_token,
    });
  };

  const openUserDetails = () => {
    console.log("OpenUserDetails " +userInfo._id + " " + userInfo.access_token);
    
    navigation.navigate("User Details", {
      _id: userInfo._id,
      accessToken: userInfo.access_token,
      refreshToken: userInfo.refresh_token,
    });
  };

  const getUser =async (id:String) => {

   const user =  await UserModel.getUserById(route.params._id)   
   
  }


  React.useEffect(() => {
    const usrc: UserCredentials = {
      _id: route.params._id,
      access_token: route.params.accessToken,
      refresh_token: route.params.refreshToken,
    };
    console.log("USERC " + usrc._id);
    setUserInfo(usrc);
    setAccessToken(route.params.accessToken);
    //console.log("USERINFO " + userInfo._id);
    //console.log("AccesToken " + accessToken);
    getUser(usrc._id)
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{flexDirection:"row"}}>
        <TopBarAddButton onClick={openAddPost}></TopBarAddButton>
        <TopBarUserDetailsBtn onClick={openUserDetails}></TopBarUserDetailsBtn>
        </View>
        )
      },
    });
    // navigation.setOptions({
    //     headerRight: () => {
    //       return <TopBarUserDetailsBtn onClick={openUserDetails}></TopBarUserDetailsBtn>;
    //     },
    //   });
  }, [route.params?._id]);

  const openPostDetails = (id: String) => {
    console.log("On press " + id);
    navigation.navigate("Details", { id: id });
  };
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      // screen is back in display
      console.log("screen in focus");
      reloadData();
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      reloadData();
    });
  }, [navigation]);

  const reloadData = async () => {
    setIsLoading(true);
    const postData = await PostModel.getAllPosts();
    setData(postData);
    setIsLoading(false);
  };

  return (
    <View style={styles.home_container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostListRow post={item} onItemClick={openPostDetails} />
        )}
      ></FlatList>
      <View style={styles.activity_indicator}>
        <ActivityIndicator visible={isLoading}></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
  },
  list_row_container: {
    height: 150,
    // width: "100%",
    // backgroundColor: "grey",
    flexDirection: "row",
    elevation: 4,
    borderRadius: 3,
    marginLeft: 8,
    marginRight: 8,
  },
  list_row_image: {
    height: 130,
    width: 130,
    margin: 10,
    borderRadius: 15,
  },
  list_row_text_container: {
    justifyContent: "center",
  },
  list_row_name: {
    fontSize: 30,
    marginBottom: 10,
  },
  list_row_id: {
    fontSize: 25,
  },
  activity_indicator: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
export default Home;