import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk))

import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAE9FxfiKOuUsAMnrGGrpnjua_Sq0KVhas",
  authDomain: "audiodemos-e0fdd.firebaseapp.com",
  projectId: "audiodemos-e0fdd",
  storageBucket: "audiodemos-e0fdd.appspot.com",
  messagingSenderId: "105707504948",
  appId: "1:105707504948:web:34d9170b25d85cf07e5161"
};

if (firebase.apps.length === 0) {
  console.log('init fiorebase')
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator()

export default class App extends Component<{}, { loaded: boolean, loggedIn: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />


        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
