import {View, Image} from 'react-native';
import styles from '@css/loading.module.css';
export const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@img/loading.gif')} style={{width: 200, height: 200}}/>
        </View>
    )
}