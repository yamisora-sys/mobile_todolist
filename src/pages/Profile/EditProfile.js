import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useAuth} from '@context/auth';
import styles from "@css/editprofile.module.css";
import { useState } from 'react';
import { getDate, FormatDateDMY } from '@config/format';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserUpdate } from '@redux/reducer/userSlice';
import { useDispatch } from 'react-redux';
import ToastManager, {Toast} from 'toastify-react-native';
export const EditProfile = ({navigation}) => {
    const {auth, setAuth} = useAuth();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const updateProfile = async () => {
        if(auth.firstname == '' || auth.lastname == '' || auth.email== ''){
            Toast.error('Vui lòng nhập đầy đủ thông tin', 'top');
            return;
        }
        // check email
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(auth.email)){
            Toast.error('Email không hợp lệ', 'top');
            return;
        }
        await dispatch(UserUpdate(auth));
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Chỉnh sửa profile</Text>
            <View>
                <Text>Họ</Text>
                <TextInput style={styles.inputView} value={auth.firstname} onChangeText={(text) =>{
                    setAuth({...auth, firstname: text});
                }}/>
                <Text>Tên</Text>
                <TextInput style={styles.inputView} value={auth.lastname} onChangeText={(text) =>{
                    setAuth({...auth, lastname: text});
                }}/>
                <Text>Email</Text>
                <TextInput editable={false} style={styles.inputView} onChangeText={(text)=>{
                    setAuth({...auth, email: text});
                }}>{auth.email}</TextInput>
                <Text>Username</Text>
                <TextInput editable={false}  style={styles.inputView}>{auth.username}</TextInput>
                <View>
                    <Text>Birthday</Text>
                    <TouchableOpacity style={styles.inputView} onPress={() => setShow(true)}>
                        <Text style={styles.inputText}>{FormatDateDMY(auth.birthday)}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(auth.birthday)}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShow(Platform.OS === 'ios');
                                setAuth({...auth, birthday: selectedDate});
                            }}
                        />
                    )}
                </View>
                <View style={styles.button} >
                <TouchableOpacity onPress={() => {
                    updateProfile();
                }}>
                    <Text style={styles.loginText}>Lưu</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}