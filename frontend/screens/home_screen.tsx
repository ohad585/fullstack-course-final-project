import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";


import COLORS from "../constants/colors";
import { UserCredentials } from "../model/user_model";

import  ActivityIndicator  from "./component/custom_activity_indicator";

// const StudentListRow: FC<{ id: String; name: String ,onItemClick: (id:String)=>void }> = ({ id, name,onItemClick }) => {
//   return (
//     <TouchableHighlight onPress={()=>{onItemClick(id)}} underlayColor ={COLORS.clickBackground} >
//       <View style={styles.list_row_container}>
//         <Image
//           source={require("../assets/avatar.jpeg")}
//           style={styles.list_row_image}
//         ></Image>
//         <View style={styles.list_row_text_container}>
//           <Text style={styles.list_row_name}>{name}</Text>
//           <Text style={styles.list_row_id}>{id}</Text>
//         </View>
//       </View>
//     </TouchableHighlight>
//   );
// };

const Home: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {

  const TopBarAddButton: FC<{onClick:()=>void}> = ({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}} underlayColor ={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={"grey"} />
        </TouchableHighlight>
    )
}



 

  //const [data,setData] = useState<Array<Student>>();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});
  const [accessToken,setAccessToken] = useState<String>("")
  const openAddPost = ()=>{
    navigation.navigate("Add Post",{_id:userInfo._id,accessToken:userInfo.access_token,refreshToken:userInfo.refresh_token})
  }
  React.useEffect(()=>{
    const usrc:UserCredentials = {
      _id:route.params._id,
      access_token:route.params.accessToken,
      refresh_token:route.params.refreshToken
    }
    console.log("USERC "+usrc._id);
    setUserInfo(usrc)
    setAccessToken(route.params.accessToken)
    console.log("USERINFO "+userInfo._id);
    console.log("AccesToken "+accessToken);
    navigation.setOptions({headerRight: ()=>{return (<TopBarAddButton onClick={openAddPost}></TopBarAddButton>)}})
    
  },[route.params?._id])
  

  const openDetails = (id:String) =>{
      console.log("On press "+ id); 
      navigation.navigate("Details",{id :id});
  }
  React.useEffect(()=>{
    navigation.addListener('focus',()=>{
         // screen is back in display
      console.log("screen in focus")
      reloadData() 
    })
  },[navigation])

  
  
  const reloadData = async ()=>{
    setIsLoading(true)
    //let studentData:any = await StudentModel.getAllStudent()
    
    //setData(studentData)
    setIsLoading(false)
  }


  return (
    <View style={styles.home_container}>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={({ item }) => (
          <StudentListRow id={item.id} name={item.name} onItemClick={openDetails}></StudentListRow>
        )}
      ></FlatList> */}
      <View style={styles.activity_indicator}>
      <ActivityIndicator visible={isLoading} ></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
  },
  list_row_container: {
    height: 120,
    //width : "100%",
    //backgroundColor : "grey",
    elevation: 2,
    borderRadius: 3,
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
  },
  list_row_image: {
    height: 100,
    width: 100,
    margin: 10,
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
  activity_indicator:{
    position:"absolute",
    justifyContent:"center",
    width:"100%",
    height:"100%",
    alignItems:"center"
  }
});

export default Home;
