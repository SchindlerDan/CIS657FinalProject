import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Main from './screens/Main';
import Login from './screens/Login';
import Read from './screens/Read';
import Write from './screens/Write';
import Settings from './screens/Settings';
import ReadList from './screens/ReadList';


const Stack= createStackNavigator();



export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="Read" component={Read}/>
      <Stack.Screen name="Entries" component={ReadList}/>
      <Stack.Screen name="Write" component={Write}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
