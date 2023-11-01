import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function ToDo() {
    const db = SQLite.openDatabase('ToDo.db');
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState(null);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists todos (id integer primary key not null, todo text, done int);');
        });
        
        db.transaction(tx => {
            tx.executeSql('select * from todos;', [], (_, { rows }) =>
                setTodos(rows._array)
            );
        });
    }, []);

    const showTodos = () => {
        return todos.map((todo, index) => {
            return (
                <View key={index} style={styles.todo}>
                    <Text>{todo.todo}</Text>
                </View>
            )
        }
    )}

    const addTodo = () => {
        db.transaction(tx => {
            tx.executeSql('insert into todos (todo, done) values (?, 0);', [currentTodo],
            (txObj, resultSet) => {
                let existing = [...todos];
                existing.push({id: resultSet.insertId, todo: currentTodo, done: 0});
                setTodos(existing);
                setCurrentTodo(null);
            }
            );
        });
    }

    return (
        <View style={styles.container}>
            <TextInput value={currentTodo} placeholder='set to do' onChangeText={setCurrentTodo}/>
            <Button onPress={addTodo} title='Add'/>
            {showTodos()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});