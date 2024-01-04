
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import {AuthConsumer, AuthProvider} from '@context/auth';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@pages/Home';
import Journal from '@pages/Journal';
import Daily from '@pages/Daily';
import Profile from '@pages/Profile/Profile';
import AuthScreen from '@pages/Auth';
import {TodaySchedule} from '@pages/Home/TodaySchedule';
import {AddTodo} from '@pages/Todo/AddTodo';
import {TodayList} from '@pages/Home/TodayList';
import { AddTodo2 } from '@pages/Todo/AddTodo2';
import {TextRuning} from '@animations/TextRuning';
import { Introduction } from '@pages/Introduction';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import {Loading} from '@components/Loading';
import { EditTodo } from '@pages/Todo/EditTodo';
import { WelcomeScreen } from '@pages/Welcome';
export default function App() {
  const [firstrun, setFirstrun] = useState(true);
  const firstime = async () => {
    try {
      // AsyncStorage.setItem('firstime', 'true');
      const value = await AsyncStorage.getItem('firstime');
      return value;
    } catch(e) {
      console.log(e);
    }
  }
  const [welcome, setWelcome] = useState(true);
  useEffect(() => {
    firstime().then((res) => {
      if(res == null || res == 'true') {
        setFirstrun(true);
      }
      else {
        setFirstrun(false);
      }
    })
    if(firstrun == false) {
      setTimeout(() => {
        setWelcome(false);
      }, 2000)
    }
  })
  if(firstrun) {
    return (
      <Introduction changeState={setFirstrun}/>
    )
  }
  if(welcome) {
    return (
      <WelcomeScreen/>
    )
  }
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
                <>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
                <Stack.Screen name="TodaySchedule" component={TodaySchedule} options={{headerShown: true}}/>
                <Stack.Screen name="AddTodo" component={AddTodo} options={{headerShown: true}}/>
                <Stack.Screen name="EditTodo" component={EditTodo} options={{headerShown: true}}/>
                <Stack.Screen name="TodayList" component={TodayList} options={{headerShown: true}}/>
                <Stack.Screen name="AddTodo2" component={AddTodo2} options={{headerShown: true}}/>
                </>
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
      <Tab.Navigator
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" />,
         headerShown: false, 
        }}/>
        <Tab.Screen name="Journal" component={Journal} options={{ tabBarIcon: () => <Icon name="calendar-check-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Daily" component={Daily} options={{ tabBarIcon: () => <Icon name="smile-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Icon name="user-circle-o" size={25} color="#900" />,
          headerShown: false,
      }}/>
      </Tab.Navigator>
  )
}