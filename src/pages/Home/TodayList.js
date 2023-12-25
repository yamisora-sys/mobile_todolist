import {View, ScrollView, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {completeTodoData, getTodayTodoData} from '@redux/reducer/todoSlice';
import {useEffect} from 'react';
import styles from '@css/listitem.module.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '@context/auth';
export const TodayList = ({navigation}) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.todo);
    const {todayData, loading, error, message} = state;
    const {auth, setAuth} = useAuth();
    const completeTodo = async (id) => {
        await dispatch(completeTodoData(id));
        await dispatch(getTodayTodoData(auth.id));
    }
    return (
        <ImageBackground source={require('@img/bg4.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
        <ScrollView>
            {
                todayData.map((item, index) => {
                    return (
                        <View key={index} style={[styles.line, styles.twoCol]}>
                            <Text style={styles.timeText}>{item.time}</Text>
                            <View style={styles.details}> 
                                <Text>{item.title}</Text>
                                <Text>{item.description}</Text>
                            </View>
                            <View style={styles.displayButton}>
                            {
                                item.completed ? (
                                    <Icon name="check-square" size={30} color="green" />
                                ) : (
                                    <TouchableOpacity onPress={() => completeTodo(item.id)}>
                                        <Icon name="square-o" size={30} color="green" />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        </View>
                    )
                })
            }
            </ScrollView>
            </View>
        </ImageBackground>
    )
}