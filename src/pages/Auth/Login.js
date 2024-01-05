import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { UserLogin, Logout, ClearError, ClearMessage } from '@redux/reducer/userSlice';
import { Loading } from '@components/Loading';
import { useAuth } from '@context/auth';
import ToastManager, { Toast } from 'toastify-react-native';
export default function Login({ navigation }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {auth, setAuth} = useAuth();
    const dispatch = useDispatch();

    const state = useSelector(state => state.user);
    const {user, loading, error, message} = state;

    const handleLogin = async () => {
        dispatch(UserLogin({ username, password }));
        // Alert.alert('Thông báo', message);
    }

    useEffect(()=>{
        if(user != null){
            setAuth(user);
        }
        if(error){
            Toast.error(error.message, 'top');
            dispatch(ClearError());
        }
        if(message){
            Toast.success(message, 'top');
            dispatch(ClearMessage());
        }
    })
    // if (loading) return <Loading />
    return (
        <View style={styles.container}>
            <ToastManager position="top" />
            <View style={styles.logo}>
                <Image source={require('@img/logo.jpg')}/>
            </View>
            <Text style={styles.logoText}>Welcome to my app</Text>
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
                    placeholder="Password..." 
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.centeredView}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} >
                <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{
                navigation.navigate('Register');
            }}>
                <Text style={styles.btnText}>Signup</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}