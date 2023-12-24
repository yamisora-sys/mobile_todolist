import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserTodoByDateData} from '@redux/reducer/todoSlice';
import {useAuth} from '@context/auth';
import {Loading} from '@components/Loading';
import {getTime} from '@config/format.js';
import {useFocusEffect} from '@react-navigation/native';
export default function Journal() {
    const [selected, setSelected] = useState(new Date());
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const state = useSelector(state => state.todo);
    const {todoDataByDate, loading, error, message} = state;
    const [markDate, setMarkDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const fetchData = async () => {
        dispatch(getUserTodoByDateData(auth.id));
    }
    // get key of todoDataByDate
    const getTodoDataByDate = () => {
        let res = Object.keys(todoDataByDate);
        let data = {};
        res.map((item, index) => {
            data[item] = {selected:true, selectedColor: '#ff00d4'}
        })
        return data;
    }
    useEffect(() => {
        setMarkDate(getTodoDataByDate());
    }, []);
    useFocusEffect(
        useCallback(() => {
        fetchData();
        }, [])
    );
    return (
        <ImageBackground source={require('@img/bg3.jpg')} style={{width: '100%', height: '100%'}}>
        <View>
            <Calendar 
            onDayPress={(day) => (
                setSelected(day),
                setSelectedEvent(todoDataByDate[day.dateString])
            )}
            markedDates={{
                [selected.dateString]: {selected: true, selectedColor: 'blue', marked: true},
                ...markDate
            }}
            // set background color transparent
            style={{
                backgroundColor: 'transparent',
                marginTop: 20,
                color: '#fff'
            }}
            />
            <View style={{marginTop: 20}}>
                {selectedEvent && selectedEvent.map((item, index) => {
                    return (
                        <View key={index} style={{backgroundColor: '#ff00d4', padding: 10, margin: 10}}>
                            <Text style={{color: '#fff'}}>{item.title}</Text>
                            <Text style={{color: '#fff'}}>{item.details}</Text>
                            <Text style={{color: '#fff'}}>{getTime(item.start_time)}</Text>
                        </View>
                    )
                })}
                </View>
        </View>
        </ImageBackground>
    );
}

