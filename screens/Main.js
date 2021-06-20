import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  
  View,
} from "react-native";
import { setupHistoryListener, initHistoryDB, storeHistoryItem } from '../apis/fb-helpers';

import Read from './Read';
import Write from './Write';
import { appID } from "../apis/facebookAppId";




const Main = ({ route, navigation }) => {
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
      appId: appID,
      version: "v11.0",
    });
  }, []);


  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>


        <TouchableOpacity 
        style={styles.reader}
          onPress={() =>
            navigation.navigate("Entries", { entries: entries })
          }
        >
          <Text style={styles.text}>Read Entry</Text>
        </TouchableOpacity>


        <TouchableOpacity
        style={styles.writer}
          onPress={() => navigation.navigate("Write", { entries: entries, fb: fbCredentials })}
        >
          <Text style={styles.text} >Write Entry</Text>
        </TouchableOpacity>

      
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  bigContainer:{
    flex: 1,
    
    
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    
  },
  reader:{
    flex: 1,
    backgroundColor: '#00cc99',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  writer: {
    flex: 1,
    backgroundColor: '#00ccff',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },

  text: {
    fontWeight: 'bold',
    
  },

});

export default Main;