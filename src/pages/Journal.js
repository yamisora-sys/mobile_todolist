import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserTodoByDateData, ClearMessage} from '@redux/reducer/todoSlice';
import {useAuth} from '@context/auth';
import {Loading} from '@components/Loading';
import {getTime} from '@config/format.js';
import {useFocusEffect} from '@react-navigation/native';
import {FloatButton} from '@components/FloatButton';
import {FormatDateTime} from '@config/format.js';
import styles from '@css/scheduled.module.css';
import ToastManager, {Toast} from 'toastify-react-native';
export default function Journal({navigation}) {
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
        if(message) {
            Toast.success(message, 'top');
            dispatch(ClearMessage());
        }
    }, []);
    useFocusEffect(
        useCallback(() => {
        fetchData();
        setMarkDate(getTodoDataByDate());
        }, [])
    );
    return (
        <ImageBackground source={require('@img/bg3.jpg')} style={{width: '100%', height: '100%'}}>
        <ToastManager position="top" />
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
            <ScrollView contentContainerStyle={styles.eventContainer}>
                {selectedEvent && selectedEvent.map((item, index) => {
                    return (
                        <View key={index} style={[styles.eventItem, item.completed&&styles.completeEvent]}>
                            <View>
                            <Text style={styles.eventText}>{item.title}</Text>
                            <Text style={styles.eventText}>{item.details}</Text>
                            </View>
                            <Text style={styles.eventText}>{getTime(item.start_time)}</Text>
                        </View>
                    )
                })}
                {
                    selectedEvent == null && (
                        <View style={styles.noEvent}>
                            <Text style={styles.eventText}>Không có sự kiện</Text>
                        </View>
                    )
                }
                </ScrollView>
        </View>
        <FloatButton navigation={navigation} route="Add Todo" params={{
            date: selected.dateString + " 00:00"
        }} />
        </ImageBackground>
    );
}
