//register page
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '@context/auth';
import {UserRegister} from '@redux/reducer/userSlice';
import {Loading} from '@components/Loading';
export default function Register({ navigation }) {
        const [firstname, setFirstName] = useState('');
        const [lastname, setLastName] = useState('');
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const {auth, setAuth} = useAuth();

        const dispatch = useDispatch();
        const state = useSelector(state => state.user);
        const {user, loading, error, message} = state;
        const handleRegister = async () => {
            let data = {
                firstname,
                lastname,
                username,
                email,
                password,
            }
            dispatch(UserRegister(data));
        }

        const handlCheckPassword = () => {
            if(password.length < 6){
                Alert.alert('Password must be at least 6 characters');
            }
        }
        
        useEffect(()=>{
            if(user != null){
                setAuth(user);
            }
        })
        if (loading) return <Loading />
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    {/* <Image source={require('@assets/logo.png')} style={{width: 200, height: 200}}/> */}
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="First Name..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setFirstName(text)}
                        />
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Last Name..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setLastName(text)}
                        />
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Username..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setUserName(text)}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Email..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setEmail(text)}/>
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
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} >
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        );
}