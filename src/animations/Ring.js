import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRef, useEffect } from "react";
import styles from "@css/animations/ring.module.css";

export const Ring = ({ delay, color="hotpink", size=50 }) => {
  const ring = useRef(new Animated.Value(0)).current;
  const ringScale = ring.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });
  const ringOpacity = ring.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  useEffect(() => {
    Animated.loop(
      Animated.timing(ring, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        delay: delay,
      })
    ).start();
  }, []);
  return <Animated.View style={[styles.circle, 
    {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: color,
      transform: [{ scale: ringScale }],
      opacity: ringOpacity,
      animationDelay: `${delay}ms`,
    },
  ]} />;
};


export function RingContainer({ children }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ring color="hotpink" delay={0} />
      <Ring color="orange" delay={500} />
      <Ring color="cyan" delay={1000} />
    </View>
  );
}
