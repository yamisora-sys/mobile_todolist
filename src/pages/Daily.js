import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@context/auth";
import {
  getDailyTodoData,
  getCompletedTodoInWeekData,
  getFrequecyInMonthData,
} from "@redux/reducer/todoSlice";
import { useFocusEffect } from "@react-navigation/native";
import { DailyItem } from "@pages/Todo/DailyItem";
import CollapsibleList from "@components/CollapsibleList";
import { BarChart, ContributionGraph } from "react-native-chart-kit";
import { Loading } from "@components/Loading";
import styles from '@css/daily.module.css';
export default function Daily() {
  const dispatch = useDispatch();
  const { auth, setAuth } = useAuth();
  const state = useSelector((state) => state.todo);
  const { dailyData, completedTodoInWeek, frequencyInMonth, Loading } = state;

  const fetchDailyTodo = async () => {
    dispatch(getDailyTodoData(auth.id));
    dispatch(getCompletedTodoInWeekData(auth.id));
    dispatch(getFrequecyInMonthData(auth.id));
  };
  // useEffect(() => {
  //     fetchDailyTodo();
  // }, [])
  useFocusEffect(
    useCallback(() => {
      fetchDailyTodo();
    }, [])
  );
  if (Loading) {
    return <Loading />;
  }
  return (
    <ImageBackground source={require("@img/Personal.jpg")} style={{
      width: '100%',
      height: '100%',
    }}>
    <ScrollView style={styles.container}>
      <CollapsibleList title="Công Việc Hằng Ngày">
        {dailyData &&
          dailyData.map((item, index) => <DailyItem key={index} item={item} />)}
      </CollapsibleList>
      {completedTodoInWeek != null && (
        <>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Đã hoàn thành trong 7 ngày qua</Text>
        <BarChart
          data={completedTodoInWeek}
          width={400}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              margin: 20,
            },
          }}
          verticalLabelRotation={30}
        />
        </>
      )}
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>Tần suất hoàn thành trong 1 tháng</Text>
      <ContributionGraph
        values={frequencyInMonth}
        endDate={new Date()}
        numDays={105}
        width={500}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        verticalLabelRotation={30}
      />
    </ScrollView>
    </ImageBackground>
  );
}
