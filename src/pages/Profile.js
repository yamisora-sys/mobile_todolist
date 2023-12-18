import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.setting}>
                <Icon name="cog" size={25} color="#900" />
            </View>
        </ScrollView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});