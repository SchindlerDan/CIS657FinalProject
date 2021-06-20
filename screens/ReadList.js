import {
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  




  const ReadList = ({route, navigation}) => {
    const entries = route.params.entries;
  

    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <Text style={styles.headerButton}> Main </Text>
            </TouchableOpacity>
          ),
          
        });
      });

    const FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      };
    

      console.log('route.params.entries: ', route.params.entries);
    return(

        <View>

          {
          route.params.entries.length < 1?
            (<Text>If you were expecting journal entries, please try again shortly</Text>):

            (

        <FlatList
      style={styles.screen}
      keyExtractor={(item) => `${item.id}`}
      data={route.params.entries}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={({ index, item }) => {
        return(
            <TouchableHighlight 
            onPress={()=> {
                navigation.navigate("Read", {entry: item, entries: entries});
            }}
            
            >
                <View style={styles.container}>

                  <View>  
            <Image source={{uri: item.picture.uri}} style={{
                height: 40,
                width: 40,
            }}/>
            </View>

            <View>
               <Text>{item.title}</Text> 
               <Text>{item.date}</Text> 
            </View>
            </View>
         
            
            </TouchableHighlight>
        );
      }}
    />

             ) }
</View>

    );

  }



  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 4,
      paddingTop: 10,
    },
    container:{
        flex: 1,
        flexDirection: 'row',
    },



  });

  export default ReadList;