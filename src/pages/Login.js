import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { UserLogin, Logout } from '@redux/reducer/userSlice';
import { Loading } from '@components/Loading';
export default function Login({ navigation }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const state = useSelector(state => state.user);
    const {user, loading, error, message} = state;
    const handleLogin = async () => {
        await dispatch(UserLogin({ username, password }));
        Alert.alert('Thông báo', message);
    }

    const handleLogout = async () => {
        dispatch(Logout());
    }

    if (loading) return <Loading />
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                {/* <Image source={require('@assets/logo.png')} style={{width: 200, height: 200}}/> */}
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
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.loginText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );



}