import {Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import styles from '@css/addtodo.module.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { Loading } from '@components/Loading';
import { getTodoData, createTodoData } from '@redux/reducer/todoSlice';
import { useAuth } from '@context/auth';
import { useDispatch, useSelector } from 'react-redux';

export const AddTodo = ({navigation}) => {
    const {auth, setAuth} = useAuth();
    const [data, setData] = useState({
        user_id: auth.id,
        imageURL: 'hello',
    });

    const {loading, error, message} = useSelector(state => state.todo);
    const dispatch = useDispatch();
    const handleAddTodo = async () => {
        dispatch(createTodoData(data)); 
        console.log(data)
        Alert.alert('Thông báo', message);
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleAddTodo}>
                    
                    <Icon name="save" size={30} color="#900" />
                </TouchableOpacity>
            ),
        });
    })
    return (
        <View style={styles.container}>
            <View>
                <Text>tiêu đề</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tiêu đề"
                    onChangeText={text => setData({...data, title: text})}
                />
            </View>
            <View>
                <Text>Mo ta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mo ta"
                    onChangeText={text => setData({...data, details: text})}
                />
            </View>
        </View>
    )
}
