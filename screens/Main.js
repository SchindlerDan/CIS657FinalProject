import React, {useEffect, useState} from "react";
import { Feather } from "@expo/vector-icons";

import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import {setupHistoryListener, initHistoryDB, storeHistoryItem} from '../apis/fb-helpers';

  import Read from './Read';
  import Write from './Write';


  

const Main = ({route, navigation}) =>{
  const [entries, setEntries] = useState([]);
  const [fbCredentials, setFBCredentials] = useState({});


 


    useEffect(() => {
        try {
          initHistoryDB();
        } catch (err) {
          console.log(err);
        }
        setupHistoryListener((items) => {
          setEntries(items);
        });
        console.log('set up history');
        setFBCredentials(route.params.response);

        FB.init({
          appId: "173908391360573",
          version: "v11.0",
        });
      }, []);

      
    return(
        <View>
            <Text>
                Yo you arrived to main page man
            </Text>
            <View>
                <TouchableOpacity
                onPress={()=> 
                    navigation.navigate("Entries", {entries: entries})
                }
                >
                    <Text>Read Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => navigation.navigate("Write", {entries: entries, fb: fbCredentials})}
                >
                    <Text>Write Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>

                    </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Main;