import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useAuth} from '@context/auth';
import { getDailyTodoData, getCompletedTodoInWeekData,  getFrequecyInMonthData  } from '@redux/reducer/todoSlice';
import { useFocusEffect } from '@react-navigation/native';
import {DailyItem} from '@pages/Todo/DailyItem';
import CollapsibleList from '@components/CollapsibleList'
import {BarChart, ContributionGraph} from 'react-native-chart-kit';
import { Loading } from '@components/Loading';
export default function Daily() {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const state = useSelector(state => state.todo);
    const {dailyData, completedTodoInWeek, frequencyInMonth, Loading } = state;

    const fetchDailyTodo = async () => {
        dispatch(getDailyTodoData(auth.id));
        dispatch(getCompletedTodoInWeekData(auth.id));
        dispatch(getFrequecyInMonthData(auth.id));
    }
    // useEffect(() => {
    //     fetchDailyTodo();
    // }, [])
    useFocusEffect(
        useCallback(() => {
            fetchDailyTodo();
        }, [])
    )
    if(Loading) {
        return (
            <Loading/>
        )
    }
    return (
        <ScrollView>
            <CollapsibleList title="Cong viec hang ngay">
            {
                dailyData && dailyData.map((item, index) => (
                    <DailyItem key={index} item={item} />
                ))
            }
            </CollapsibleList>
            <BarChart 
                data={completedTodoInWeek}
                width={500}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                    borderRadius: 16
                    }
                }}
                verticalLabelRotation={30}
            />
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
                    borderRadius: 16
                    }
                }}
                verticalLabelRotation={30}
            />
        </ScrollView>
    );
    }
