import React, { FC, useState } from "react";
import { View, Text } from "react-native";

const Details: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {

    const [studentId ,setStudentId] = useState<String>("")
    React.useEffect(()=>{
        if(route.params?.id){
            setStudentId(route.params.id)
        }
    })

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details: {studentId}</Text>
      </View>
    );
  };

  export default Details