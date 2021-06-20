import React, { useState, useEffect, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
} from "react-native";
import axios from 'axios';

import { Button, Input } from "react-native-elements";
import { Camera } from 'expo-camera';


import {
  initHistoryDB,
  setupHistoryListener,
  storeHistoryItem,
} from "../apis/fb-helpers";
import { getWeather } from "../apis/weatherHelper";



const Write = ({ route, navigation }) => {



  const today = new Date();
  const initialField = useRef(null);

  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const entries = route.params.entries;
  const fbCredentials = route.params.fb;

  const [entry, setEntry] = useState({
    name: fbCredentials.name,
    date: date,
    title: '',
    zipcode: 0,
    notes: '',
    picture: null,
    weather: null,


  });

  const [cam, setCam] = useState(null);




  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);






  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const snap = async () => {
    if (cam) {
      let pic = await cam.takePictureAsync();
      takePicture(pic);
    }
  };











  const saveEntry = () => {
    if (entry.picture === null) {
      Alert('You forgot to take a picture!');
      return;
    }
    if (entry.weather === null) {
      Alert('Please enter a valid zip code');
      return;
    }



    storeHistoryItem(entry);
    navigation.push("Read", { entry: entry, entries: entries });

  }








  const calcWeather = async () => {



    if (entry.zipcode.toString().length === 5) {
      var weather = {};

      await getWeather((data) => {
        weather = data;
      }, entry.zipcode);

      updateStateObject(
        {
          weather: weather,
        }

      );



    } else {
      updateStateObject({
        weather: null
      })

    }

  }









  const takePicture = (val) => {
    updateStateObject({ picture: val });
  }

  const updateStateObject = (vals) => {
    setEntry({
      ...entry,
      ...vals
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={ref => {
            setCam(ref);
          }}
        >
          <View style={styles.buttonContainer}>


            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                snap();
              }}


            >
              
            </TouchableOpacity>

          </View>
        </Camera>
      </View>




      <Text style={styles.text, {alignSelf: 'center',}}>Tap the camera to take a picture!</Text>

      <Text style={styles.text}>Title:</Text>


      <Input
        style={styles.input}
        placeholder=""
        ref={initialField}
        value={entry.title}
        autoCorrect={false}
        onChangeText={(val) => updateStateObject({ title: val })}
      />


      <Text style={styles.text}>Zipcode:</Text>
      <Input
        placeholder={entries[0] ? entries[0].zipcode : "5 digit zipcode"}
        style={styles.input}
        ref={initialField}
        value={entry.zipcode}
        autoCorrect={false}
        onChangeText={(val) => { updateStateObject({ zipcode: val, weather: null }) }}
      />


      <Text style={styles.text}>Notes:</Text>
      <Input
        style={styles.input}
        placeholder={"Write your journal entry here"}
        ref={initialField}
        value={entry.notes}
        autoCorrect={false}
        onChangeText={(val) => updateStateObject({ notes: val })}
      />









      {

        entry.weather ?
          <TouchableOpacity
            onPress={saveEntry}
          >
            <Text>
              Save (Requires photo)
            </Text>
          </TouchableOpacity>

          :
          <TouchableOpacity
            onPress={calcWeather}
          >
            <Text style={styles.text}>
              Tap me and I'll use your zipcode to figure out the weather so you can save
            </Text>
          </TouchableOpacity>

      }



      
      {entry.picture ?
        (

          <Image
            style={styles.snapshot}
            source={{ uri: entry.picture.uri }}
          />


        ) :
        (<Text>Your Image preview will appear here. </Text>)


      }
    </View>
  );
}





const styles = StyleSheet.create({




  container: {
    flex: 1,
    backgroundColor: '#00ccff',

  },
  camera: {
    flex: 1,
 
  },
  cameraContainer:{
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    //flexDirection: 'row',
    margin: 20,

  },
  button: {
    flex: 1,
    //alignSelf: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    
  },
  text: {
    //fontSize: 18,
    fontWeight: 'bold',
  },

  snapshot: {
    flex: 2,
  },









});

export default Write;