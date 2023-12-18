import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@css/home.module.css';
export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={
            styles.container
        }>
            <View style={styles.task}>
                <View>
                    <Text style={styles.titleText}>Today's task</Text>
                    <View style={styles.status}>
                        <Icon name='check-circle' size={25} color="#ffffff"/>
                        <Text>2/4 tasks completed</Text>
                    </View>
                </View>
                <View style={styles.taskList}>
                    <Icon name='chevron-right' size={40} color="#ffffff"/>
                </View>
            </View>
            <View style={styles.daily}>
                <View style={styles.title}>
                    <Text>Continue your</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>Daily Remente</Text>
                </View>
                <View>
                    <Text style={styles.more}><Icon name='chevron-right' size={40} color="#973131"/></Text>
                </View>
            </View>
            <View style={styles.mygoal}>
                <View style={styles.head}>
                    <Text style={styles.titleText}>My Goal</Text>
                    <Text style={{color: '#0066ff', fontSize: 25}}>See more</Text>
                </View>
            </View>
        </ScrollView>
    );
    }
