import {Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import style from '@css/todo.module.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '@components/Loading';
import { getTodoData, createTodoData, completeTodoData } from '@redux/reducer/todoSlice';
import { useAuth } from '@context/auth';

export const Todo = ({navigation}) => {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        dispatch(getTodoData(auth.id));
      }, []);

    const state = useSelector(state => state.todo);
    const {todoData, loading, error, message} = state;
    
    const completeTodo = (id) => {
        dispatch(completeTodoData({id, user_id: auth.id}))
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>To Do List</Text>
                <TouchableOpacity style={style.headerBar} onPress={() => navigation.navigate('AddTodo')}>
                    <Icon name="plus" size={30} color="#900" />
                </TouchableOpacity>
            </View>
            <View style={style.content}>
                <ScrollView>
                    {todoData.length >0 && todoData.map((item, index) => {
                        return (
                            <View key={index} style={[style.todoItem, item.completed&&style.completed]}>
                                <View>
                                    <Text style={style.todoTitle}>{item.title}</Text>
                                    <Text style={style.todoContent}>{item.details}</Text>
                                </View>
                                {
                                    item.completed == 0 ? (
                                        <TouchableOpacity style={style.todoButton} onPress={() => completeTodo(item.id)}>
                                    <Icon name="check" size={30} color="#900" />
                                </TouchableOpacity>
                                    ) :(
                                        <Text style={style.todoCompleted}>Completed</Text>
                                    )
                                }
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}