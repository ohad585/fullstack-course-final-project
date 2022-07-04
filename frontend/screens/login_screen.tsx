import React ,{ FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView,Button} from "react-native";
import UserModle,{User} from "../model/user_model"
import COLORS from "../constants/colors";


const Login: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [UserName,setUserName] = useState<String>("")
    const [Password,setPassword] = useState<String>("")

    const onLoginPress = async ()=>{
      setIsLoading(true)
      React.useEffect(()=>{
        //get the right user
        if(route.params?.id){
            setUserName(route.params.id)
        }
    })
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Page</Text>
        <TextInput style={styles.textInput} onChangeText={setUserName} placeholder="UserName" keyboardType="default"></TextInput>
        <TextInput style={styles.textInput} onChangeText={setPassword} placeholder="Password" keyboardType="default"></TextInput>
        //log in with facebook
        <Button onClick={()=>}>Login with Faceook</Button>
        //log in with google
        <Button onClick={()=>}>Login with Google</Button>

        <TouchableHighlight
        underlayColor={COLORS.clickBackground} 
        onPress={()=>{ 
          onLoginPress()
        }} 
        style={styles.button}>
         <Text style={styles.buttonText}>Login</Text>
       </TouchableHighlight>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flex:1
    },
   
    textInput:{
      height:40,
      margin:12,
      borderWidth:1,
      padding:10,
      borderColor:"grey",
    },
    button:{
      margin:12,
      backgroundColor:"grey",
      borderRadius:50
    }
})


  export default Login