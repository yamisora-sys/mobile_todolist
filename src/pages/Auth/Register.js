//register page
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth} from '@context/auth';
import {UserRegister, ClearError, ClearMessage} from '@redux/reducer/userSlice';
import {Loading} from '@components/Loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormatDateTime, getDate } from '@config/format.js';
import ToastManager, {Toast} from 'toastify-react-native';

export default function Register({ navigation }) {
        const [firstname, setFirstName] = useState('');
        const [lastname, setLastName] = useState('');
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [birthday, setBirthday] = useState(new Date());
        const [show, setShow] = useState(false);
        const {auth, setAuth} = useAuth();

        const dispatch = useDispatch();
        const state = useSelector(state => state.user);
        const {user, loading, error, message} = state;
        const handleRegister = async () => {
            if(firstname == '' || lastname == '' || username == '' || email == '' || password == '' || birthday == ''){
                // Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
                Toast.error('Vui lòng nhập đầy đủ thông tin', 'top');
                return;
            }
            if(password.length < 3){
                Toast.error('Mật khẩu phải có ít nhất 3 ký tự', 'top');
                // Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 3 ký tự');
                return;
            }
            // check email
            const regex = /\S+@\S+\.\S+/;
            if(!regex.test(email)){
                Toast.error('Email không hợp lệ', 'top');
                // Alert.alert('Thông báo', 'Email không hợp lệ');
                return;
            }
            let data = {
                firstname,
                lastname,
                email,
                username,
                birthday: getDate(birthday),
                password,
            }
            await dispatch(UserRegister(data));
        }
        
        useEffect(()=>{
            if(user != null){
                setAuth(user);
            }

            if(error){
                Toast.error(error, 'top');
                dispatch(ClearError());
            }
            if (message){
                Toast.success(message, 'top');
                dispatch(ClearMessage());
            }
        })

        return (
            <View style={styles.container}>
                <ToastManager position="top-center" />
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
                <View>
                    <TouchableOpacity style={styles.inputView} onPress={() => setShow(true)}>
                        <Text style={styles.inputText}>{getDate(birthday)}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={birthday}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShow(Platform.OS === 'ios');
                                setBirthday(selectedDate);
                            }}
                        />
                    )}
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} >
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        );
}