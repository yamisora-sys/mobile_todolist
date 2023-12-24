import Icon from "react-native-vector-icons/FontAwesome";
import {View, TouchableOpacity} from 'react-native';
import styles from '@css/floatButton.module.css';
export const FloatButton = ({route, navigation}) => {
    return (
        <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate(route)}>
            <Icon name='plus' size={30} color="#ffffff"/>
        </TouchableOpacity>
    )
}