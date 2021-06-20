import React, {useState, useEffect}from "react";
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




  const Read = ({route, navigation}) => {


    const entry = route.params.entry;
    const entries = route.params.entries;

    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Entries", {entries: entries})}>
              <Text style={styles.headerButton}> Entries </Text>
            </TouchableOpacity>
          ),
          
        });
      });






  

    return(
        <View style={styles.container}>
            <Image style={styles.userImage}source={{ uri: entry.picture.uri }}/>
             
             <View style={styles.textContainer}>
               <Text style={styles.name}>{entry.name}</Text>
             <Text style={styles.title}>{entry.title}</Text>
            <Text>{entry.date}</Text>
            <Text>{ entry.weather? entry.weather.main.temp +  " Degrees Fahrenheit": "Unknown Temperature Conditions"}</Text>
            <Text>{ entry.weather? "Weather conditions: " + entry.weather.weather[0].description: "Unknown Weather Conditions"}</Text>
            <Text>{"Notes: " +  entry.notes}</Text>


            
            <View>
               
            </View>
                
          



            
            </View>

        </View>
    );
  }

  const styles = StyleSheet.create({
      container:{
        flex: 1,
        backgroundColor: '#00cc99',

      },
    userImage: {
        flex: 1,
    },
    textContainer: {
        flex: 2,
    },
    title: {
      alignSelf: "center",
      fontWeight: "bold",
    },
    name: {
      alignSelf: "center",
      fontWeight: "bold",
    },
    date: {

    },
    weather: {

    },
    notes: {

    },

});



  export default Read;