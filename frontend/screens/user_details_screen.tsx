import React, { FC, useState } from "react";
import { View, Text } from "react-native";

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

      </View>
    );
  };

  export default UserDetails