import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import DeckList from './components/DeckList'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { strongCyan } from './utils/colors'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import Deckview from './components/DeckView'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: strongCyan,
        activeTintColor: 'white',
        inactiveTintColor: strongCyan,
        style: {
          height: 80,
        },
        labelStyle: {fontSize: 15},
      }}
    >
      <Tab.Screen 
        name="Decks" 
        component={DeckList} 
        options={{ 
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='cards-outline' size={50} color={color} />
      }} />
      <Tab.Screen 
        name="New Decks" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='plus-box-outline' size={50} color={color} />
        }}  
      />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>New Deck</Text>
    </View>
  );
}

export default class App extends React.Component {

  render() {
    
    return (  
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={strongCyan} barStyle='light-content' />  
          <Stack.Navigator>
            <Stack.Screen name="Home" component={MyTabs} />
            <Stack.Screen name="DeckView" component={Deckview} />
          </Stack.Navigator> 
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
