
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import {AuthConsumer, AuthProvider} from '@context/auth';

import HomeScreen from '@pages/Home';
import Journal from '@pages/Journal';
import Daily from '@pages/Daily';
import Profile from '@pages/Profile/Profile';
import Todo from '@pages/Todo/ToDo.js';
import AuthScreen from '@pages/Auth';
import {TodaySchedule} from '@pages/Home/TodaySchedule';
import {AddTodo} from '@pages/Todo/AddTodo';
import {TodayList} from '@pages/Home/TodayList';
import {RingContainer} from '@animations/Ring';
import {TextRuning} from '@animations/TextRuning';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import {Loading} from '@components/Loading';
import {AllTodoScreen} from '@pages/Todo/AllTodo';

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
                <>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
                <Stack.Screen name="TodaySchedule" component={TodaySchedule} options={{headerShown: true}}/>
                <Stack.Screen name="AddTodo" component={AddTodo} options={{headerShown: true}}/>
                <Stack.Screen name="EditTodo" component={AddTodo} options={{headerShown: true}}/>
                <Stack.Screen name="TodayList" component={TodayList} options={{headerShown: true}}/>
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
        <Tab.Screen name="TextRuning" component={TextRuning} options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" />,
          headerShown: false, 
          }}/>
        <Tab.Screen name='AllTodo' component={AllTodoScreen} options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" />,
          headerShown: false, 
          }}/>
        <Tab.Screen name="Journal" component={Journal} options={{ tabBarIcon: () => <Icon name="calendar-check-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Daily" component={Daily} options={{ tabBarIcon: () => <Icon name="smile-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Icon name="user-circle-o" size={25} color="#900" />}}/>
        <Tab.Screen name="Todo" component={Todo} options={{ tabBarIcon: () => <Icon name="list-ul" size={25} color="#900" />}}/>
      </Tab.Navigator>
  )
}