import { FC } from "react"
import FacebookLogin,{ReactFacebookLoginInfo} from "react-facebook-login"

const FaceookLoginButton: FC<{responseFacebook:(response:ReactFacebookLoginInfo)=>void}> =({responseFacebook}) =>{
    
    return (
        <FacebookLogin
          appId="1088597931155576"
          autoLoad
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )
}

export default FaceookLoginButton