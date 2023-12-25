import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
export default function Daily() {
    return (
        <View>
        <Text>Home Screen</Text>
        <StatusBar style="auto" />
        </View>
    );
    }
