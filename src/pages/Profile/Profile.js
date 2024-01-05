
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logout} from '@redux/reducer/userSlice';
import {useDispatch} from 'react-redux';
import {useAuth} from '@context/auth';
import {useEffect} from 'react';
import styles from '@css/profile.module.css';
import { FormatDateDMY } from '@config/format';
export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const handleLogout = async () => {
        dispatch(Logout());
        setAuth(null);
    }
    useEffect(() => {
        //header right
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <Icon name="edit" size={25} color="#900" />
                </TouchableOpacity>
            ),
        });
    })
    return (
        auth && (
            <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.avatarContainer}>
                    <Icon name="user-circle-o" size={100} color="#900" />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.label}> Fullname </Text>
                <TextInput editable={false}  style={styles.textInput}>{auth.firstname} {auth.lastname}</TextInput>
                <Text style={styles.label}> Email </Text>
                <TextInput editable={false}  style={styles.textInput}>{auth.email}</TextInput>
                <Text style={styles.label}> Username </Text>
                <TextInput editable={false}  style={styles.textInput}>{auth.username}</TextInput>
                <Text style={styles.label}> Birthday </Text>
                <TextInput editable={false}  style={styles.textInput}>{FormatDateDMY(auth.birthday)}</TextInput>
            </View>
            <View style={styles.action}>
                <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('EditProfile')}>
                    <View>
                        <Text style={styles.logoutText}>Chỉnh sửa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                    <View>
                        <Text style={styles.logoutText}>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
                </View>
        </ScrollView>
        )
    );
    }
