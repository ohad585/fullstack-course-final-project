import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginBtn:React.FC = ()=> {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '508060421836-kd7fjltjf8v2o0l7dp6gltatke8rd8pa.apps.googleusercontent.com',
    androidClientId: "508060421836-94bm4uhg34q5po16kchuoqo91uhbhm29.apps.googleusercontent.com",
  });

  
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="GoogleLogin"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}


export default GoogleLoginBtn