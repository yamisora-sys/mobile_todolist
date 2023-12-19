//register page
import React, { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import { Register } from '@api/userAPI';

export default function Register({ navigation }) {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const handleRegister = async () => {
           
        }

        const handlCheckPassword = () => {
            if(password.length < 6){
                Alert.alert('Password must be at least 6 characters');
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
                        placeholder="First Name..." 
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={text => setFirstName(text)}
                        />
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Last Name..." 
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={text => setLastName(text)}
                        />
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
                <TouchableOpacity style={styles.loginBtn} onClick={()=>handleRegister()} >
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        );
}