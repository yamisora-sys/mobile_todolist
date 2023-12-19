import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import {getData, USER_DATA} from '@redux/reducer/userSlice';
import {useEffect, useState} from 'react';
import {AuthConsumer, AuthProvider} from '@context/auth';

import HomeScreen from '@pages/Home';
import Journal from '@pages/Journal';
import Daily from '@pages/Daily';
import Profile from '@pages/Profile';
import ToDo from '@pages/ToDo';
import AuthScreen from '@pages/Auth';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {Loading} from '@components/Loading';

export default function App() {
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthProvider>
        <AuthConsumer>
          {({auth}) => (
            <Stack.Navigator>
              {auth == null ? (
                <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
              ) : (
                <Stack.Screen name="Home" component={BottomTab} options={{headerShown: false}}/>
              )}
            </Stack.Navigator>
          )}
        </AuthConsumer>
      </AuthProvider>
    </NavigationContainer>
    </Provider>
  );
}

const BottomTab = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" />}}/>
        <Tab.Screen name="Journal" component={Journal} options={{ tabBarIcon: () => <Icon name="calendar-check-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Daily" component={Daily} options={{ tabBarIcon: () => <Icon name="smile-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Icon name="user-circle-o" size={25} color="#900" />}}/>
        <Tab.Screen name="ToDo" component={ToDo} options={{ tabBarIcon: () => <Icon name="list-ul" size={25} color="#900" />}}/>
        <Tab.Screen name="Loading" component={Loading} options={{ tabBarIcon: () => <Icon name="list-ul" size={25} color="#900" />}}/>
      </Tab.Navigator>
  )
}