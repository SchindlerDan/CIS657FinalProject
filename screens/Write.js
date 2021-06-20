import React, {useState, useEffect, useRef} from "react";
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
  import {Camera} from 'expo-camera';


  import {
    initHistoryDB,
    setupHistoryListener,
    storeHistoryItem,
  } from "../apis/fb-helpers";
import { getWeather } from "../apis/weatherHelper";



  const Write = ({route, navigation}) => {


    console.log('credentials in write: ', route.params);

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
  









    
    const saveEntry =  () =>{
      if(entry.picture === null ){
        Alert('You forgot to take a picture!');
        return;
      }
      if(entry.weather === null){
        Alert('Please enter a valid zip code');
        return;
      }

     
        
        storeHistoryItem(entry); 
        navigation.push("Read", {entry: entry, entries: entries});
      
    }


   





    const calcWeather = async () => {

      

      if(entry.zipcode.toString().length === 5 ){
        var weather = {};

        await getWeather((data) => {
          weather = data;
        }, entry.zipcode);
  
          updateStateObject(
            {weather: weather,
            }
  
          );

          
          
      }else {
        updateStateObject({ 
        weather: null
        })

      }
      
    }









    const takePicture = (val) => {
      updateStateObject({picture: val});
    }

    const updateStateObject = (vals) =>{
        setEntry({
            ...entry,
            ...vals
        });
    }

    return(
        <View>
     
          <View>
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
              <Text>Snap</Text>
            </TouchableOpacity>

        </View>
      </Camera>
          </View>






          <Text>Title:</Text>


            <Input
          style={styles.input}
          placeholder="Title goes here"
          ref={initialField}
          value={entry.title}
          autoCorrect={false}
          onChangeText={(val) => updateStateObject({ title: val })}
        />


        <Text>Zipcode:</Text>
        <Input
          placeholder={entries[0]? entries[0].zipcode: "enter 5 digit zipcode here"}
          style={styles.input}
          ref={initialField}
          value={entry.zipcode}
          autoCorrect={false}
          onChangeText={(val) => {updateStateObject({zipcode: val, weather: null})}}
        />


        <Text>Notes:</Text>
        <Input
          style={styles.input}
          placeholder={"Enter notes here"}
          ref={initialField}
          value={entry.notes}
          autoCorrect={false}
          onChangeText={(val) => updateStateObject({ notes: val })}
        />









            {

              entry.weather?
            <TouchableOpacity
                onPress={saveEntry}
            >
                <Text>
                    Save
                </Text>
            </TouchableOpacity>
            
            : 
              <TouchableOpacity
              onPress={calcWeather}
              >
                <Text>
                  Calculate Weather
                </Text>
              </TouchableOpacity>

            }



            <Text>
              Testing image taken Below:
            </Text>
            { entry.picture?
            (
            
            <Image 
            style={styles.camera}
            source={{ uri: entry.picture.uri }}
            />
           
              
            ):
            (<Text>No Picture yet</Text>)


            }
        </View>
    );
  }





  const styles = StyleSheet.create({
   
    input: {
      padding: 10,
    },



 
      container: {
        flex: 1,
      },
      camera: {
        //flex: 1,
        height: 100,
        width: 100,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },

  







    
  });

  export default Write;