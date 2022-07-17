import React, { FC, useState } from "react";
import { View, Text } from "react-native";

const PostDetails: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {

    const [PostId ,setPostId] = useState<String>("")
    const [PostName ,setPostName] = useState<String>("")
    const [PostText ,sePostText] = useState<String>("")
    React.useEffect(()=>{
        if(route.params?.id){
            setPostId(route.params.id)
        }
    })

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Author: {PostName}</Text>
        <Text>Text: {PostText}</Text>
      </View>
    );
  };

  export default PostDetails