import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import  Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import styles from '@css/alltodoscreen.module.css';
import CollapsibleList from '@components/CollapsibleList.js';
import { TodoItem } from './TodoItem';
export const AllTodoScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todo);
    const {loading, todoData} = state;
    const total = todoData.length;
    const completed = todoData.filter((item) => item.completed == 1).length;
    const completedTodo = todoData.filter((item) => item.completed == 1);
    const uncompletedTodo = todoData.filter((item) => item.completed == 0);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.analytic}>
                <View style={styles.analyticItem}>
                    <Icon name="bar-chart-o" size={30} color="#900" />
                    <Text style={styles.analyticItemHeader}>Total</Text>
                    <Text style={styles.analyticItemText}>{total}</Text>
                </View>
                <View style={styles.analyticItem}>
                    <Icon name="check" size={30} color="#900" />
                    <Text style={styles.analyticItemHeader}>Completed</Text>
                    <Text style={styles.analyticItemText}>{completedTodo.length}</Text>
                </View>
            </View>
            <View style={styles.list}>
                <CollapsibleList
                    title="Completed"
                    isCollapsed={false}
                >
                    {completedTodo.map((item, index) => (
                        <TodoItem item={item} key={index} navigation={navigation}/>
                    ))}
                </CollapsibleList>
            </View>
            <View style={styles.list}>
                <CollapsibleList
                    title="Uncompleted"
                    isCollapsed={false}
                >
                    {uncompletedTodo.map((item, index) => (
                        <TodoItem item={item} key={index} navigation={navigation}/>
                    ))}
                </CollapsibleList>
                </View>
        </ScrollView>
    )
}