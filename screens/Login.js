
import React, {useState} from 'react';

import FacebookLogin from 'react-facebook-login';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";







const Login = ({route, navigation}) => {


        const [loggedIn, setLoggedIn] = useState(false);
        const [data, setData] = useState({});
        const [picture, setPicture] = useState('');
      
        const FBResponse = (response) =>{
          console.log('fb response: ',response);
          setData(response);
          setPicture(response.picture.data.url);
          if(response.accessToken){
            setLoggedIn(true);
            navigation.navigate("Main", {loggedIn: loggedIn, response: response});
          }else{
            setLoggedIn(false);
          }
      
        }

        return(
            <View>
              <Text>Testing Login functionality below</Text>
                <FacebookLogin 
                    appId="173908391360573"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile"
                    callback={FBResponse}
                
                />

            </View>
        );

}


export default Login;