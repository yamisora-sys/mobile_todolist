import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Animated } from "react-native";
import {useRef, useEffect} from 'react';

export const BellRing = () => {
    const bellAnimation = useRef(new Animated.Value(0)).current;

    const Rotate = bellAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-15deg', '15deg']
    });

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bellAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                    delay: 500
                }),
                Animated.timing(bellAnimation, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(bellAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);
    return (
        <Animated.View style={{ transform: [{ rotate: Rotate }] }}>
            <Icon name="bell" size={30} color="#ffffff" />
        </Animated.View>
    );
}