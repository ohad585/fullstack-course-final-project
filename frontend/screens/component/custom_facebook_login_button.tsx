// import { FC } from "react"
// import FacebookLogin,{ReactFacebookLoginInfo} from "react-facebook-login"

// const FaceookLoginButton: FC<{responseFacebook:(response:ReactFacebookLoginInfo)=>void}> =({responseFacebook}) =>{
    
//     return (
//         <FacebookLogin
//           appId="1088597931155576"
//           autoLoad
//           callback={responseFacebook}
//           icon="fa-facebook"
//         />
//       )

// }

// export default FaceookLoginButton

import React from 'react';
import FacebookLogin from 'react-facebook-login';

class MyComponent extends React.Component {
  responseFacebook(response:any) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends,user_actions.books"
        callback={this.responseFacebook}
      />
    )
  }
}

export default MyComponent;