import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Main from './screens/Main';
import Login from './screens/Login';
import Read from './screens/Read';
import Write from './screens/Write';
import ReadList from './screens/ReadList';
import * as Analytics from 'expo-firebase-analytics';


// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};
const Stack = createStackNavigator();

export default function App() {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);


  return (
    <NavigationContainer
    ref={navigationRef}
    onStateChange={(state) => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getActiveRouteName(state);
      if (previousRouteName !== currentRouteName) {
        Analytics.setCurrentScreen(currentRouteName, currentRouteName);
      }
    }}
    >
      <Stack.Navigator screenOptions={navStyling}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="Read" component={Read}/>
      <Stack.Screen name="Entries" component={ReadList}/>
      <Stack.Screen name="Write" component={Write}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const navStyling = {
  headerStyle: {
    backgroundColor: '#0065A4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
