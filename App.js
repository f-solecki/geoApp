import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from "./components/Main"
import List from "./components/List"
import ListItem from "./components/ListItem"
import Map from "./components/Map"

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Main" component={Main} options={{
          headerShown: false
        }} />
        <Stack.Screen name="List" component={List} options={{
          title: "Zapis pozycji",
          headerStyle: {
            backgroundColor: "lightblue"
          }
        }} />
        <Stack.Screen name="ListItem" component={ListItem} />
        <Stack.Screen name="Map" component={Map} options={{
          headerStyle: {
            backgroundColor: "lightblue"
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;