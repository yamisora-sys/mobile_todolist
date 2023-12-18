import {Text, View, ScrollView, TouchableOpacity, TextInput, Button} from 'react-native';
import style from '@css/todo.module.css';
import Icon from 'react-native-vector-icons/FontAwesome';
export const ToDo = () => {
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.headerText}>Welcome Your name</Text>
                <TouchableOpacity style={style.headerIcon}>
                    <Icon name="plus" size={30} color="#ff0a0a" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ToDo;