import {View, TouchableOpacity, Animated, Svg, Text} from 'react-native';

import {useEffect, useRef} from 'react';

export const TextRuning = ({text="no text", color="black"}) => {
    const textAnimation = useRef(new Animated.Value(0)).current;
    const textScrollX = textAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10]
    });
    useEffect(() => {
        Animated.loop(
            Animated.timing(textAnimation, {
                toValue: 10,
                duration: 5000,
                useNativeDriver: true
            })
        ).start();
    }, []);
    return (
        <Animated.Text style={{color: color,
            transform: [
                {
                    translateX: textScrollX
                }
            ]
        }}>
            {text}
        </Animated.Text>
    )
}