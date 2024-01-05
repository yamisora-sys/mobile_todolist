
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import {AuthConsumer, AuthProvider} from '@context/auth';
import { useState, useEffect, useRef } from 'react';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import ToastManager, {Toast} from 'toastify-react-native';
import { schedulePushNotification, customPushNotification} from '@config/notification';
import { EditProfile } from '@pages/Profile/EditProfile';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [firstrun, setFirstrun] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
        if(Device.osName == "IOS") {
          customPushNotification("Hãy bắt đầu ngày mới với những điều tốt đẹp nhất nhé!", "Hãy truy cập vào ứng dụng để kiểm tra công việc hôm nay nào", {
            DailyTriggerInput: {
              hour: 6,
              minute: 0,
              repeats: true
            }
          })
          if(Device.osName == "Android"){
            customPushNotification("Hãy bắt đầu ngày mới với những điều tốt đẹp nhất nhé!", "Hãy truy cập vào ứng dụng để kiểm tra công việc hôm nay nào", {
              DailyNotificationTrigger:{
                hour: 6,
                minute: 0,
                repeats: true
              }
            })
          }
        }
        setFirstrun(true);
      }
      else {
        setFirstrun(false);
      }
    })
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    // if(firstrun == false) {
    //   setTimeout(() => {
    //     setWelcome(false);
    //   }, 2000)
    // }
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])
  if(firstrun) {
    return (
      <Introduction changeState={setFirstrun}/>
    )
  }
  
  // if(welcome) {
  //   return (
  //     <WelcomeScreen/>
  //   )
  // }
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
                <Stack.Screen name="Add Todo" component={AddTodo2} options={{headerShown: true}}/>
                <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: true}}/>
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId, })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}