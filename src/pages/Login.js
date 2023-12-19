//login page
import React, { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import { Login } from '@api/userAPI';

export default function Login({ navigation }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const result = await Login(username, password);
        if (result.status === 'success') {
            navigation.navigate('Home');
        } else {
            Alert.alert('Login failed', result.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('@assets/logo.png')} style={{width: 200, height: 200}}/>
            </View>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setUserName(text)}/>
            </View>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Password..." 
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onClick={()=>handleLogin()} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );



}