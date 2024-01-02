import {View, Text, Animated, TouchableOpacity} from 'react-native';
import {useEffect, useRef} from 'react';
import styles from '@css/animations/dropdown.module.css';

export const DropdownMenu = ({children, itemCount, isExpanded}) => {
    const ItemHeight = 85;
    const ItemMargin = 10;

    const fullHeight = (ItemHeight + ItemMargin) * itemCount;

    const collapseTop = fullHeight /2 - ItemHeight;
    
}