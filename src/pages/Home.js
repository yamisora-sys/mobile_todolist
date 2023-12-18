import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.task}>
                <View>
                    <Text style={styles.titleText}>My Tasks</Text>
                    <Text style={styles.status}><Icon name='check-circle' size={25} color="#ffffff"/> 2/4 tasks completed</Text>
                </View>
                <View style={styles.taskList}>
                    <Text style={styles.more}><Icon name='chevron-right' size={40} color="#ffffff"/></Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#838383',
    },
    task: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#a141a4',
        borderRadius: 10,
        margin: 20,
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        color: '#ffffff',
    },
    titleText: {
        flex: 1,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 25,
    },
    daily: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '80%',
        backgroundColor: '#f7ff65',
        padding: 20,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,

    },
    more: {
        alignItems: 'center',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    }
});