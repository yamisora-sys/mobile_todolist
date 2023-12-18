import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from '@redux/store';

import HomeScreen from '@pages/Home';
import Journal from '@pages/Journal';
import Daily from '@pages/Daily';
import Profile from '@pages/Profile';
import ToDo from '@pages/ToDo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" />}}/>
        <Stack.Screen name="Journal" component={Journal} options={{ tabBarIcon: () => <Icon name="calendar-check-o" size={25} color="#900" />}}/>
        <Stack.Screen name="Daily" component={Daily} options={{ tabBarIcon: () => <Icon name="smile-o" size={25} color="#900" />}}/>
        <Stack.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Icon name="user-circle-o" size={25} color="#900" />}}/>
        <Stack.Screen name="ToDo" component={ToDo} options={{ tabBarIcon: () => <Icon name="list-ul" size={25} color="#900" />}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
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
