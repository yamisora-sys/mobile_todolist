import {View, TouchableOpacity, Animated} from 'react-native';
import {useRef, useEffect} from 'react';
import Svg, {Circle, Line} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Countdown(){
    // hour and minute animation
    const hourAnimation = useRef(new Animated.Value(0)).current;
    const minuteAnimation = useRef(new Animated.Value(0)).current;
    const hourRotation = hourAnimation.interpolate({
        inputRange: [0, 12],
        outputRange: ['0deg', '360deg'],
    });
    const minuteRotation = minuteAnimation.interpolate({
        inputRange: [0, 60],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        Animated.timing(hourAnimation, {
            toValue: 12,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(minuteAnimation, {
            toValue: 60,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        // draw a clock here
        <View>
            <Svg height="300" width="300" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="#ff0000" strokeWidth="2.5" fill="none" />
                <Animated.View style={{transform: [{rotate: hourRotation}]}}>
                <Line x1="50" y1="50" x2="50" y2="10" stroke="#ff0000" strokeWidth="2.5"/>
                </Animated.View>
                <Animated.View style={{transform: [{rotate: minuteRotation}]}}>
                <Line x1="50" y1="50" x2="50" y2="10" stroke="#ff0000" strokeWidth="2.5"/>
                </Animated.View>
            </Svg>
        </View>
    )
}

export default Countdown;