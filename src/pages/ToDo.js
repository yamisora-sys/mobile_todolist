import {Text, View, ScrollView, TouchableOpacity, TextInput, Button} from 'react-native';
import style from '@css/todo.module.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '@components/Loading';
import { getTodoData, createTodoData } from '@redux/reducer/todoSlice';
export const ToDo = () => {
    const [todo, setTodo] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        getData(USER_DATA).then((res) => setTodo({...todo, user_id: res.data.id}));
      }, []);

    const state = useSelector(state => state.todo);
    const {todoData, loading, error, message} = state;
    const handleGetTodo = async () => {
        await dispatch(getTodoData(todo.user_id));
    }
    const handleAddTodo = async () => {
        await dispatch(createTodoData(todo));
    }
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>To Do List</Text>
            </View>
            <View style={style.content}>
                <View style={style.inputView} >
                    <TextInput  
                        style={style.inputText}
                        placeholder="Title..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setTodo({...todo, title: text})}/>
                </View>
                <View style={style.inputView} >
                    <TextInput  
                        style={style.inputText}
                        placeholder="Content..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setTodo({...todo, content: text})}/>
                </View>
                <TouchableOpacity style={style.loginBtn} onPress={handleAddTodo} >
                    <Text style={style.loginText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.loginBtn} onPress={handleGetTodo} >
                    <Text style={style.loginText}>Get</Text>
                </TouchableOpacity>
                <ScrollView>
                    {todoData && todoData.map((item, index) => {
                        return (
                            <View key={index} style={style.todoItem}>
                                <Text style={style.todoTitle}>{item.title}</Text>
                                <Text style={style.todoContent}>{item.content}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export default ToDo;