import TimeLine from 'react-native-timeline-flatlist'
import { View, Text } from 'react-native';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useAuth} from '@context/auth';
import {Loading} from '@components/Loading';
import {getTodayTodoData} from '@redux/reducer/todoSlice';

export const TodaySchedule = ({navigation}) =>{
    const {auth, setAuth} = useAuth();
    const dispatch = useDispatch();
    const state = useSelector(state => state.todo);
    const {todayData, loading, error, message} = state;
    if (loading) return <Loading />
    return (
            <TimeLine
                data={todayData}
                circleSize={20}
                circleColor='rgb(45,156,219)'
                lineColor='rgb(45,156,219)'
                timeContainerStyle={{minWidth:52, marginLeft: 10}}
                timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                descriptionStyle={{color:'gray'}}
                options={{
                    style:{paddingTop:5}
                }}
            />
    )
}