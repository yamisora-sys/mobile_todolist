import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "@css/home.module.css";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ProgressChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodayTodoData,
  getTodayProgressData,
  calculateTodayProgress,
  getCategoryData,
  getTodoData
} from "@redux/reducer/todoSlice";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@context/auth";
import { Loading } from "@components/Loading";
import { TodayScreen } from "@pages/Home/TodayScreen";
import { TodaySchedule } from "@pages/Home/TodaySchedule";
import { useFocusEffect } from "@react-navigation/native";
import {FloatButton} from '@components/FloatButton';
import { AllTodoScreen } from "../Todo/AllTodo";
import { CategoryScreen } from "../Todo/CategoryScreen";
const TopTab = createMaterialTopTabNavigator();

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const { auth, setAuth } = useAuth();
  const { loading, todayProgress, todayData, category } = state;
  const fetchData = useCallback(() => {
    dispatch(getTodayTodoData(auth.id));
    dispatch(getTodayProgressData(auth.id));
    dispatch(getTodoData(auth.id));
  });
  useEffect(() => {
    dispatch(getCategoryData());
  }, []);
    useFocusEffect(
        useCallback(() => {
        fetchData();
        }, [])
    );
  return loading ? (
    <Loading />
  ) : (
    <View style={styles.navigation}>
        <FloatButton navigation={navigation} route="AddTodo"/>
      <TopTab.Navigator
        initialRouteName="Today"
        screenOptions={{
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            backgroundColor: "#f8fff0",
            borderRadius: 100,
            borderWidth: 1,
            borderColor: "#ffffff",
            marginHorizontal: 5,
            marginTop: 20,
          },
          tabBarStyle: {
            backgroundColor: "#ffffff00",
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#ff000000",
          },
          tabBarActiveTintColor: "hotpink",
          tabBarInactiveTintColor: "#000000",
        }}
      >
        <TopTab.Screen name="Today" component={TodayScreen} />
        <TopTab.Screen name="All" component={AllTodoScreen} />
        {
          category.map((item, index) => {
            return (
              <TopTab.Screen name={item.name} component={CategoryScreen} key={index}/>
            )
          })
        }
      </TopTab.Navigator>
    </View>
  );
}
