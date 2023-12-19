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
import HomeScreen from '@pages/Home';
import Journal from '@pages/Journal';
import Daily from '@pages/Daily';
import Profile from '@pages/Profile';
import ToDo from '@pages/ToDo';
import Login from '@pages/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getData(USER_DATA).then((res) => setUser(res.data));
  }, []);
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
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
        <Tab.Screen name="Login" component={Login} />
      </Tab.Navigator>
  )
}