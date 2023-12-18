import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect, useCallback } from 'react';
import { dbConnect, createTable, getData, insertData } from './config/db';
import { ToDo_fields, ToDoType, ToDo_insert } from './model/ToDo';

export default function ToDo() {
    const db = dbConnect();
    const [todos, setTodos] = useState([]);
    const [data, setData] = useState({
        id: 0,
        title: '',
        description: '',
        status: 0,
        created_at: '',
        updated_at: '',
    });
    const [currentTodo, setCurrentTodo] = useState(null);

    const loadDatabase = useCallback(async () => {
        await createTable(db, 'todos', ToDo_fields);
        let data = await getData(db, 'todos');
        setTodos(data);
    }, []);    

    useEffect(() => {
        loadDatabase();
    }, [loadDatabase]);
    const showTodos = () => {
        return todos.map((item, index) => {
            return (
                <View key={index} style={styles.todo}>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.status}</Text>
                    <Text>{item.created_at}</Text>
                </View>
            )
        }
    )}

    const addTodo = () => {
        let now = new Date();
        setData({
            ...data,
            created_at: now,
            updated_at: now,
        });
        const values = `("${data.title}", "${data.description}", "${data.status}", "${data.created_at}", "${data.updated_at}")`;
        insertData(db, 'todos', ToDo_insert, values);
    }

    return (
        <View style={styles.container}>
            <TextInput value={currentTodo} placeholder='title' onChangeText={(value) => {
                setData({
                    ...data,
                    title: value,
                });
            
            }}/>
            <TextInput value={currentTodo} placeholder='to do' onChangeText={(value) => {
                setData({
                    ...data,
                    description: value,
                });
            }}/>
            <Button onPress={addTodo} title='Add'/>
            <ScrollView>
            {showTodos()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});