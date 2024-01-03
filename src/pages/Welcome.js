import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import React, { useEffect, useRef } from 'react';

export const WelcomeScreen = () => {
    return (
        <Image source={require('@img/welcome.gif')} 
        style={{
            width: 500,
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
        }}/>
    );
};
