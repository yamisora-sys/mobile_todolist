
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logout} from '@redux/reducer/userSlice';
import {useDispatch} from 'react-redux';
import {useAuth} from '@context/auth';
import {useEffect} from 'react';
import styles from '@css/profile.module.css';
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
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.avatarContainer}>
                    <Icon name="user-circle-o" size={100} color="#900" />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.label}> Fullname </Text>
                <Text style={styles.textInput}>{auth.firstname} {auth.lastname}</Text>
                <Text style={styles.label}> Email </Text>
                <Text style={styles.textInput}>{auth.email}</Text>
                <Text style={styles.label}> Username </Text>
                <Text style={styles.textInput}>{auth.username}</Text>
                <Text style={styles.label}> Birthday </Text>
                <Text style={styles.textInput}>{auth.birthday}</Text>
            </View>
        </ScrollView>
    );
    }
