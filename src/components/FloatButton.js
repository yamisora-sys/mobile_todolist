import Icon from "react-native-vector-icons/FontAwesome";
import {View, TouchableOpacity, Animated, Svg} from 'react-native';
import styles from '@css/floatButton.module.css';
import {useRef, useEffect} from 'react';
import {Ring } from '@animations/Ring';
export const FloatButton = ({route, navigation}) => {
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
    }, []);
    return (
        <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate(route)}>
            <Ring delay={0} color="#ffffff" size={50}/>
            <Ring delay={500} color="#ffffff" size={50}/>
            <Ring delay={1000} color="#ffffff" size={50}/>
            <Icon name='plus' size={30} color="#ffffff"/>
        </TouchableOpacity>
    )
}