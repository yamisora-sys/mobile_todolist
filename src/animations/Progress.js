import {View, Animated, StyleSheet, Easing} from 'react-native';
import {useRef, useEffect} from 'react';
import Sgv, {Line} from 'react-native-svg';

export function ProgressBar(){

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progress = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });
    useEffect(() => {
        Animated.loop(
            Animated.timing(progressAnimation, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start();

    }, [progressAnimation]);
    return (
        <View>
            <Animated.View
                style={[
                    styles.progressBar,
                   {
                        transform: [
                            {
                                translateX: progress
                            }
                        ]
                   }
                
                ]}
            >
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#ff0000',
        borderRadius: 10
    }
});