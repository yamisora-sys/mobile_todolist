import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Collapsible from 'react-native-collapsible';
import {useState} from 'react';
import styles from '@css/components/collapsiblelist.module.css';
export default function CollapsibleList ({children, title, isCollapsed=true}) {
    const [collapsed, setCollapsed] = useState(isCollapsed);
    return (
        <>
            <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                <View style={styles.title}>
                    <Icon name={collapsed ? "caret-down" : "caret-up"} size={30} color="#900" />
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                {children}
            </Collapsible>
        </>
    )
}
