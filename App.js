import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import DeckList from './components/DeckList'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { strongCyan } from './utils/colors'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import Deckview from './components/DeckView'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import { setLocalNotification } from './utils/notifications'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <NavigationContainer>
          <StatusBar backgroundColor={strongCyan} barStyle='light-content' />  
          <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={MyTabs} 
                options={{
                  headerStyle:{
                    backgroundColor: strongCyan
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: "center",
                  }}
            />
            <Stack.Screen 
                name="DeckView" 
                component={Deckview} 
                options={{
                  headerStyle:{
                    backgroundColor: strongCyan
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: "center",
                  }}
            />
            <Stack.Screen 
                name="Quiz" 
                component={Quiz} 
                options={{
                  headerStyle:{
                    backgroundColor: strongCyan
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: "center",
                  }}
            />
            <Stack.Screen 
                name="AddCard" 
                component={AddCard} 
                options={{
                  headerStyle:{
                    backgroundColor: strongCyan
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: "center",
                  }}
            />
          </Stack.Navigator> 
        </NavigationContainer>
  )
}

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
        component={NewDeck} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='plus-box-outline' size={50} color={color} />
        }}  
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {    
    return (  
      <Provider store={createStore(reducer)}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
